import { FETCH_USER, SET_LOCATION, FETCH_USER_PENDING } from "./types";
import { exampleAccount } from "../exampleDataTypes/clientExamlpeDataTypes";
import { db } from "../consts/firebase";

export const fetchUserPending = (user) => dispatch => {
    dispatch({ type: FETCH_USER_PENDING, payload: true })
}
export const resetUserPending = () => dispatch => {
    dispatch({ type: FETCH_USER_PENDING, payload: false })
}

export const resetUser = () => dispatch => {
    dispatch({ type: FETCH_USER, payload: {} });
}

export const fetchUser = (UID, EMAIL) => async dispatch => {
    console.log(`Fetching User ${UID}`)
    if (UID !== undefined) {
        db.collection("Users").where("UID", "==", UID)
            .get()
            .then((querySnapshot) => {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach((doc) => {
                        if (doc.exists) {
                            // console.log("user dispatched")
                            dispatch({ type: FETCH_USER, payload: {doc:doc.id, ...doc.data()} })
                        } else {
                            console.log("User Doc From UID does not exist")
                            dispatch({ type: FETCH_USER, payload: exampleAccount });

                        }
                    });
                }
                else {
                    console.log("Trying User email to tie the account")
                    db.collection("Users").where("email", "==", EMAIL)
                        .get()
                        .then((querySnapshot) => {
                            if (!querySnapshot.empty) {
                                querySnapshot.forEach((doc) => {
                                    if (doc.exists) {
                                        // console.log("user dispatched")
                                        //Consider adding the UID to the User account for easy access
                                        if(!doc.data().UID){
                                            const UserRef = db.collection("Users").doc(doc.id);
                                            db.runTransaction((transaction) => {
                                                return transaction.get(UserRef).then((UserDoc) => {
                                                    if (!UserDoc.exists) {
                                                        throw "Document does not exist"
                                                    }
                                                    let data = UserDoc.data();
                                                    let output = {
                                                        ...data,
                                                        UID:UID
                                                    }
                                                    if(data.UID && data.UID === UID){
                                                        output.doc = UserDoc.id;
                                                        return output;
                                                    }
                                                    transaction.update(UserRef, output);
                                                    output.doc = UserDoc.id;
                                                    return output;
                                                    //do the update and return output
                                                }).then((output) => {
                                                    dispatch({ type: FETCH_USER, payload: output })
                                                    
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                            })
                                        }
                                        else{
                                            console.log("ERROR UID exists but email method was used")
                                        }
                                        
                                        
                                    } else {
                                        console.log("Example user dispatched no docs found")
                                        dispatch({ type: FETCH_USER, payload: exampleAccount });

                                    }
                                });
                            }
                            else {

                                console.log("user not found from email dispatched")
                                dispatch({ type: FETCH_USER, payload: exampleAccount });
                            }

                        }).catch((error) => {
                            console.log(error)
                            dispatch({ type: FETCH_USER, payload: exampleAccount });
                        });
                }

            }).catch((error) => {
                console.log(error)
                dispatch({ type: FETCH_USER, payload: exampleAccount });
            });
    }
    else if (EMAIL !== undefined) {

        // dispatch({type: FETCH_USER, payload: exampleAccount});
    }

};
export const setUser = (User) => async dispatch => {
    console.log('setting User info from read')
    dispatch({ type: FETCH_USER, payload: User });
}

export const setExampleUser = () => async dispatch => {
    console.log("setting example User")
    dispatch({ type: FETCH_USER, payload: exampleAccount });
}


export const setLocation = (formProps) => async dispatch => {
    //try Async Post request authenticated dispatch User data
    dispatch({ type: SET_LOCATION, payload: formProps });
    //or dispatch API error if it doesnt work

}