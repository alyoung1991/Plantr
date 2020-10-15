const PlantSchema = {
    id: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    speciesName: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
};

module.exports = PlantSchema;