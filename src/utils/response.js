//Ok
function response200(response, data) {
    customData = data

    if(!Array.isArray(data)){
        customData = [data]
    }

    response.status(200).json({
        status: 'ok',
        data: customData,
    });
}

//Created
function response201(response, data) {
    //Array check not needed
    response.status(201).json({
        status: 'ok',
        data: [data],
    });
}

// Not Modified
function response304(response) {
    response.status(304).json({
        status: 'error',
        data: [{
            id: '304',
            name: 'Not modified',
        }],
    });
}

// Unauthorized
function response401(response) {
    response.status(401).json({
        status: 'error',
        data: [{
            id: '401',
            name: 'Unauthorized',
        }],
    });
}

// Forbidden
function response403(response) {
    response.status(403).json({
        status: 'error',
        data: [{
            id: '403',
            name: 'Forbidden',
        }],
    });
}

// Not Found
function response404(response) {
    response.status(404).json({
        status: 'error',
        data: [{
            id: '404',
            name: 'Not found',
        }],
    });
}

//Server error
function response500(response) {
    response.status(500).json({
        status: 'error',
        data: [{
            id: '500',
            name: 'Internal Server Error',
        }],
    });
}

module.exports = {
    response200: (response, data) => response200(response, data),
    response201: (response, data) => response201(response, data),
    response304: (response) => response304(response),
    response401: (response) => response401(response),
    response403: (response) => response403(response),
    response404: (response) => response404(response),
    response500: (response) => response500(response),
}
