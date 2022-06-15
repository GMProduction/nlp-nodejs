export const SuccessResponse = (res, meta = {}) => {
    return res.status(200).json({
        code: 200,
        success: 'success',
        ...meta
    })
}
export const ItemNotFoundResponse = (res, meta = {}) => {
    return res.status(202).json({
        code: 202,
        ...meta
    })
}

export const ErrorResponse = (res, meta = {}) => {
    return res.status(500).json({
        code: 500,
        ...meta
    })
}