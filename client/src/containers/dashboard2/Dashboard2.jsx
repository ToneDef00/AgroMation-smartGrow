import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { reduxForm } from "redux-form";
//import axios from "axios";
//redux actions
import { addGrowRoom, fetchUserGrowRoomsAndStatus } from "../../actions";
//auth
import requireAuth from "../../hoc/requireAuth";

//import components
import { Container, Grid } from "@material-ui/core";
import DashboardSummery from "../../components/DashboardSummery/DashboardSummry";



//import styling
import "./style.css"
import { SystemNotifications } from '../SystemNotificationWidget/SystemNotifications';



class Dashboard2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            offset: 256
        }
    }

    checkOffset() {

    }

    render() {
        return (
            <Container className={"dashboardMain"}>
                <Grid container direction={'column'} spacing={6}>
                    <Grid
                        container item direction="row"  
                        spacing={3} xs>
                        <DashboardSummery />
                    </Grid>
                    <Grid container item direction="row"  
                        spacing={3} xs >
                        <SystemNotifications/> 
                        
                    </Grid>
                    {/* <Grid item direction="row" justify="center" alignItems="stretch" xs={12} spacing={3}> */}
                </Grid>
            </Container>
        );
    }

}





function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(
    connect(mapStateToProps, { addGrowRoom: addGrowRoom, fetchGrowRooms: fetchUserGrowRoomsAndStatus }),
    reduxForm({ form: 'Add todo' })
)(Dashboard2);

export default requireAuth(formedComponent);
