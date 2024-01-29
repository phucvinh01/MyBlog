export const getMetaBlogApi = async (params:string) => {
    try {
        const response =await fetch(`http://localhost:3000/api/blog/${params}`);
        return await response.json();
    } catch (err) {
        console.log(err)
    }
}