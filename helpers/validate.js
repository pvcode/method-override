module.exports = {
    validateCategory: (req, res) => {
        req.checkBody("title", "Title: không được rỗng").notEmpty();
        req.checkBody("content", "Content: không được rỗng").notEmpty();
        req.checkBody("ordering", "Ordering: phải là số nguyên").isNumeric();
        req
        .checkBody("status", "Status: chọn một trạng thái")
        .isNotEqual("novalue");
    }
};
