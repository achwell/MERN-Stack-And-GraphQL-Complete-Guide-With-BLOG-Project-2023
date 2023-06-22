import {useQuery} from "@apollo/client";
import {GET_BLOGS} from "../../graphql/queries";
import BlogList from "./BlogList";

const Blogs = () => {
    const { loading, data, error} = useQuery(GET_BLOGS);

    if (error) return <p>ERROR...</p>
    if (loading) return <p>Loading...</p>

    return (
        <div><BlogList blogs={data.blogs}/></div>
    )
}
export default Blogs
