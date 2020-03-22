import lostDocuments from '../../models/lostAndFound'

export const foundsResolver = async (req, res)=>{
    const found = new lostDocuments({
        documentType: req.body.documentType,
        documentNumber: req.body.documentNumber,
        owner:{
            fullName: req.body.ownerName,
            phoneNumber: req.body.ownerPhoneNumber,
            email: req.body.ownerEmail
        },
        whoFound:{
            fullName: req.body.foundName,
            phoneNumber: req.body.foundPhoneNumber,
            email: req.body.foundEmail
        },
        status: {
            isFound: true,
        },
        location: {
            pickingPlace: req.body.location
        },
        requireReward: req.body.reward
    });
    try {
        const foundDoc = await found.save();
        res.json(foundDoc)
    } catch (error) {
        res.json(error.message);
    };
};

export const lostResolver = async (req, res) =>{
    const lost = new LostDocuments({
        documentType: req.body.documentType,
        documentNumber: req.body.documentNumber,
        owner:{
            fullName: req.body.ownerName,
            phoneNumber: req.body.ownerPhoneNumber,
            email: req.body.ownerEmail
        },
        status: {
            isLost: true,
        },
        location: {
            lostPlace: req.body.location
        },
        requireReward: req.body.reward
    });
    try {
        const lostDoc = await lost.save();
        res.json(lostDoc);
    } catch (error) {
        res.json(error.message);
    };
};