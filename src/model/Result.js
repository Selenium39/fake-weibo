/**
 * 统一返回模型
 */
class Result {
    constructor({
        errCode,
        data,
        msg
    }) {
        this.errCode = errCode
        if (data) {
            this.data = data
        }
        if (msg) {
            this.msg = msg
        }
    }
}

class SuccessResult extends Result {
    constructor(data = {}) {
        super({
            errCode: 0,
            data
        })
    }
}

class ErrorResult extends Result {
    constructor({
        errCode,
        msg
    }) {
        super({
            errCode,
            msg
        })
    }
}

module.exports = {
    SuccessResult,
    ErrorResult
}