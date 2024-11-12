const errorHandler = (err, req, res) => {
    res.status(500).send({ message: err.message})
}

module.exports = errorHandler