import {FETCH_MANAGED_USERS, PENDING_MANAGED_USERS, ADD_MANAGED_USER} from "./types";
import {exampleManagedUsers} from "../exampleDataTypes/clientExamlpeDataTypes";
import {db} from "../consts/firebase";




export const pendingManagedUsers = () => dispatch => {
    dispatch({type: PENDING_MANAGED_USERS, payload: true})
};


export const resetPendingManagedUsers = () => dispatch => {
    dispatch({type: PENDING_MANAGED_USERS, payload: false})
}


export const fetchManagedUsers = (UID) => dispatch => {
    db.collection('Users').where("accountOwner", "==", UID).get().then((querySnapshot) => {
        if(!querySnapshot.empty){
            let managedUsers = [];
            querySnapshot.forEach((doc, index) => {
                if (doc.exists) {
                    managedUsers.push(doc.data())
                } else {
                    console.log("managed User does not exist");

                }
            });
            dispatch({type:FETCH_MANAGED_USERS, payload:managedUsers});
        }
        else{
            console.log("Example managed users dispatched")
            dispatch({ type: FETCH_MANAGED_USERS, payload: exampleManagedUsers });
        }

    }).catch((err) => {
        console.log(err);
        dispatch({ type: FETCH_MANAGED_USERS, payload: exampleManagedUsers });
    })
}