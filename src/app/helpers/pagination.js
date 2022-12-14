exports.getPagination = (page, size) => {
    const limit = size ? +size : 10
    const offset = page ? page * limit : 0
  
    return { limit, offset }
}

exports.getPagingData = (totalItems, page, limit = 10) => {
    
    const currentPage = page ? +page : 0
    const totalPages = Math.ceil(totalItems / limit)
  
    return { totalItems, totalPages, currentPage }
}
