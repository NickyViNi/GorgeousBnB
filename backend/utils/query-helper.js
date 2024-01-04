const { Op } = require("sequelize");

//(1) Create a pagination Object:
const createPagination = (query) => {
    let { page, size } = query;

    page = page || 1;
    size = size || 20;

    if (page > 10) { page = 10 };
    if (size > 20) { size = 20 };

    const pagination = {
      limit: size * 1,
      offset: size * (page - 1)
    };

    return pagination;
}

//(2) Create a query search obj:
const createQueryObject = (query) => {
    const { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = query;

    const queryObj = {
        where: {}
    };

    if (minLat) {
        queryObj.where.lat = {
            [Op.gte]: parseFloat(minLat)
        }
    }
    if (maxLat) {
        queryObj.where.lat = {
            [Op.lte]: parseFloat(maxLat)
        }
    }

    if (minLng) {
        queryObj.where.lng = {
            [Op.gte]: parseFloat(minLng)
        }
    }
    if (maxLng) {
        queryObj.where.lng = {
            [Op.lte]: parseFloat(maxLng)
        }
    }

    if (minPrice) {
        queryObj.where.price = {
            [Op.gte]: parseFloat(minPrice)
        }
    }
    if (maxPrice) {
        queryObj.where.price = {
            [Op.lte]: parseFloat(maxPrice)
        }
    }

    return queryObj;
}

//(3) Query parameter validation errors:
const queryParameterValidate = async (req, res, next) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = page || 1;
    size = size || 20;

    page = parseInt(page);
    size = parseInt(size);

    const paramsError = {};

    if (isNaN(page) || page < 1) {
        paramsError.page = "Page must be greater than or equal to 1"
    }

    if (isNaN(size) || size < 1) {
        paramsError.size = "Size must be greater than or equal to 1"
    }

    if (maxLat && (isNaN(maxLat) || maxLat < -90 || maxLat > 90)) {
        paramsError.maxLat = "Maximum latitude is invalid"
    }

    if (minLat && (isNaN(minLat) || minLat < -90 || minLat > 90)) {
        paramsError.minLat = "Minimum latitude is invalid"
    }

    if (maxLng && (isNaN(maxLng) || maxLng < -180 || maxLng > 180)) {
        paramsError.maxLng = "Maximum longitude is invalid"
    }

    if (minLng && (isNaN(minLng) || minLng < -180 || minLng > 180)) {
        paramsError.minLng = "Minimum longitude is invalid"
    }

    if (maxPrice && (isNaN(maxPrice) || maxPrice < 0)) {
        paramsError.maxPrice = "Maximum price must be greater than or equal to 0"
    }

    if (minPrice && (isNaN(minPrice) || minPrice < 0)) {
        paramsError.minPrice = "Minimum price must be greater than or equal to 0"
    }

    if (Object.keys(paramsError).length) {
        const err = new Error("Bad Request");
        err.status = 400;
        err.errors = paramsError;
        return next(err);
    }

    next();
}

module.exports = {
    createPagination,
    createQueryObject,
    queryParameterValidate
}
