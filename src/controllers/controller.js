import LostDocuments from '../../models/lostAndFound';
import Resolver from '../resolvers/resolver';


class Controller {
    static async lostController (req, res){

        //checking if the lost documents has found before
        const theFound = await LostDocuments.findOne({
            $and: [
                {documentNumber: req.body.documentNumber},
                {documentType: req.body.documentType},
                {'status.isFound':true}
            ]
        });

        //if the document is found before or to save a lost document
        if (theFound) {
            try {
                const update = await LostDocuments.updateOne({_id: theFound._id}, 
                    {$set: {
                        'status.isLost':true, 
                        'location.lostPlace':req.body.location, 
                        'owner.fullName':req.body.ownerName,
                        'owner.phoneNumber':req.body.ownerPhoneNumber,
                        'owner.email':req.body.ownerEmail
                    }}, {$upsert:false});
    
                res.json({
                    msg: `Your ${theFound.documentType} has found by:`,
                    whoFoundIt: {
                        Name: theFound.whoFound.fullName,
                        phoneNumber: theFound.whoFound.phoneNumber,
                        email: theFound.whoFound.email
                    }
    
                }); 
            } catch (error) {
                res.json(error.message);
            } 
        }
        else{
            Resolver.lostResolver(req, res);
        };
    };

    static async foundController (req, res){

        //we have to search if the found documents is advertised to be lost
        const theLost = await LostDocuments.findOne({
            $and:[
                {documentNumber: req.body.documentNumber},
                {documentType: req.body.documentType},
                {'status.isLost':true}
            ]
        });
        
        //updating the lost document to be found or saving a new found document
        if (theLost) {
            const update = await LostDocuments.updateOne({_id: theLost._id}, 
                {$set: {
                    'status.isFound':true, 
                    'location.pickingPlace':req.body.location,
                    'whoFound.fullName':req.body.foundName,
                    'whoFound.phoneNumber':req.body.foundPhoneNumber,
                    'whoFound.email':req.body.foundEmail
                }});
            res.json({ 
                msg:"This document has advertised to be lost",
                owner: {
                    Name: theLost.owner.fullName,
                    phoneNumber: theLost.owner.phoneNumber,
                    email: theLost.owner.email
                }
            });
        }
        else{
            Resolver.foundsResolver(req, res);
        };
        
    };

    static async lostAndfoundDoc (req, res) {
        const lost_found = await LostDocuments.find({
            $and: [
                {'status.isLost':true},
                {'status.isFound':true}
            ]
        })
        .select({_id:0, __v:0, status:0});
        try {
            res.json(lost_found)
        } catch (error) {
            res.json(error.message)
        }
    }   
};

export default Controller;