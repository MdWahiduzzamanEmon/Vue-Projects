const getBlogData = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products')
      const data = await res.json()
  
      if (data) {
        return data
      }
    } catch (err) {
        console.log(err)
        return err
    }
  }
  
    export default getBlogData

    const singleBlog = async (id) => {
        try {
          const res = await fetch(`https://fakestoreapi.com/products/${id}`)
          const data = await res.json()
      
          if (data) {
            return data
          }
        } catch (err) {
            console.log(err)
            return err
        }
      }

        export {singleBlog}