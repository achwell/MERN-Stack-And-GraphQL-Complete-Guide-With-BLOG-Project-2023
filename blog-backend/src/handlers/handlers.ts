import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from "graphql";
import {compareSync, hashSync} from "bcryptjs";
import {Document, startSession} from "mongoose";
import {BlogType, CommentType, UserType} from "../schema/scheme";
import Blog from "../models/Blog";
import Comment from "../models/Comment";
import User from "../models/User";

type DocumentType = Document<any, any, any>

const query = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        users: {
            type: new GraphQLList(UserType),
            async resolve() {
                return await User.find();
            }
        },
        blogs: {
            type: new GraphQLList(BlogType),
            async resolve() {
                return await Blog.find();
            }
        },
        comments: {
            type: new GraphQLList(CommentType),
            async resolve() {
                return await Comment.find();
            }
        },
    }
});

const mutation = new GraphQLObjectType({
    name: "mutations",
    fields: {
        signup: {
            type: UserType,
            args: {
                name: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parent, {name, email, password}) {
                try {
                    const existingUser: DocumentType = await User.findOne({email})
                    if (existingUser) return new Error("User Already Exists");
                    const encryptedPassword = hashSync(password)
                    const user = new User({name, email, password: encryptedPassword});
                    return await user.save();
                } catch (err) {
                    return new Error("User Signup Failed. Try Again")
                }
            }
        },
        login: {
            type: UserType,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parent, {email, password}) {
                try {
                    const existingUser: DocumentType = await User.findOne({email})
                    if (!existingUser) {
                        return new Error("Wrong username or password");
                    }
                    // @ts-ignore
                    if (!compareSync(password, existingUser.password)) {
                        return new Error("Wrong username or password");
                    }
                    return existingUser
                } catch (err) {
                    return new Error("User Signup Failed. Try Again")
                }
            }
        },
        addBlog: {
            type: BlogType,
            args: {
                title: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)},
                date: {type: new GraphQLNonNull(GraphQLString)},
                user: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, {title, content, date, user}) {
                const session = await startSession();
                try {
                    session.startTransaction({session});
                    const existingUser = await User.findById(user);
                    if (!existingUser) return new Error("User not found");
                    const blog: DocumentType = new Blog({title, content, date, user});
                    existingUser.blogs.push(blog);
                    await existingUser.save({session});
                    return await blog.save();
                } catch (err) {
                    return new Error(err)
                } finally {
                    await session.commitTransaction();
                }
            }
        },
        updateBlog: {
            type: BlogType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
                title: {type: new GraphQLNonNull(GraphQLString)},
                content: {type: new GraphQLNonNull(GraphQLString)}
            },
            async resolve(parent, {id, title, content}) {
                try {
                    const existingBlog: DocumentType = await Blog.findById(id);
                    if (!existingBlog) {
                        return new Error("Blog does not exist")
                    }
                    return await Blog.findByIdAndUpdate(id, {title, content}, {new: true})
                } catch (err) {
                    return new Error(err)
                }
            }
        },
        deleteBlog: {
            type: BlogType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, {id}) {
                const session = await startSession();
                try {
                    const existingBlog: DocumentType = await Blog.findById(id).populate("user");
                    if (!existingBlog) return new Error("Blog does not exist")
                    //@ts-ignore
                    const existingUser = existingBlog.user;
                    if (!existingBlog) return new Error("No user linked to this blog")
                    session.startTransaction({session});
                    existingUser.blogs.pull(existingBlog);
                    await existingUser.save({session});
                    return await Blog.deleteOne({id})
                } catch (err) {
                    return new Error(err)
                } finally {
                    await session.commitTransaction();
                }
            }
        },
        addComment: {
            type: CommentType,
            args: {
                text: {type: new GraphQLNonNull(GraphQLString)},
                date: {type: new GraphQLNonNull(GraphQLString)},
                blog: {type: new GraphQLNonNull(GraphQLID)},
                user: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, {text, date, blog, user}) {
                const session = await startSession();
                try {
                    session.startTransaction({session});
                    const existingUser = await User.findById(user);
                    if (!existingUser) return new Error("User not found");
                    const existingBlog = await Blog.findById(blog);
                    if (!existingBlog) return new Error("Blog not found");
                    const comment: DocumentType = new Comment({text, date, blog: existingBlog, user: existingUser});
                    existingBlog.comments.push(comment)
                    existingUser.comments.push(comment);
                    await existingBlog.save({session});
                    await existingUser.save({session});
                    return await comment.save();
                } catch (err) {
                    return new Error(err)
                } finally {
                    await session.commitTransaction();
                }
            }
        },
        deleteComment: {
            type: CommentType,
            args: {
                id: {type: new GraphQLNonNull(GraphQLString)},
            },
            async resolve(parent, {id}) {
                const session = await startSession();
                try {
                    const comment: DocumentType = await Comment.findById(id);
                    if (!comment) return new Error("Comment does not exist")
                    //@ts-ignore
                    const existingUser = comment.user;
                    if (!existingUser) return new Error("No user linked to this comment")
                    //@ts-ignore
                    const existingBlog = comment.blog;
                    if (!existingBlog) return new Error("No blog linked to this comment")
                    session.startTransaction({session});
                    existingUser.comments.pull(comment);
                    existingBlog.comments.pull(comment);
                    await existingUser.save({session});
                    await existingBlog.save({session});
                    return await Comment.deleteOne({id})
                } catch (err) {
                    return new Error(err)
                } finally {
                    await session.commitTransaction();
                }
            }
        },
    }

})
export default new GraphQLSchema({query, mutation})
