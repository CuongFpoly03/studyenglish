const HTTP_CODE_ERRORS = {
    NOT_FOUND: 404, // Mã lỗi 404: Không tìm thấy (Not Found)
    BAD_REQUEST: 400, // Mã lỗi 400: Yêu cầu không hợp lệ (Bad Request)
    UNAUTHORIZED: 401, // Mã lỗi 401: Không được ủy quyền (Unauthorized)
    FORBIDDEN: 403, // Mã lỗi 403: Bị cấm (Forbidden)
    INTERNAL_SERVER_ERROR: 500, // Mã lỗi 500: Lỗi máy chủ nội bộ (Internal Server Error)
    NOT_IMPLEMENTED: 501, // Mã lỗi 501: Chưa thực hiện (Not Implemented)
    BAD_GATEWAY: 502, // Mã lỗi 502: Cổng không hợp lệ (Bad Gateway)
    SERVICE_UNAVAILABLE: 503, // Mã lỗi 503: Dịch vụ không khả dụng (Service Unavailable)
    OK: 200
};

module.exports = HTTP_CODE_ERRORS;
