const paginate = (followers) => {
    const itemsPerPage = 5
    const numberOfPages = Math.ceil(followers.length / itemsPerPage)

    const newFollowers = Array.from({ length: numberOfPages }, (_, index) => {
        const start = index * itemsPerPage
        return followers.slice(start, start + itemsPerPage)
    })
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from?retiredLocale=vi

    return newFollowers
}

export default paginate
