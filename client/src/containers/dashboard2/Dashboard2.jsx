import React, { useDispatch, useEffect } from 'react';
import { compose } from "redux";
import { connect, useSelector, shallowEqual  } from "react-redux";
import { reduxForm } from "redux-form";
//import axios from "axios";
//redux actions
import { getRooms, setRoom } from "../../actions";
//auth
import requireAuth from "../../hoc/requireAuth";

//import components
import { Container, Grid } from "@material-ui/core";
import DashboardSummery from "../../components/DashboardSummery/DashboardSummry";



//import styling
import "./style.css"
import { SystemNotifications } from '../SystemNotificationWidget/SystemNotifications';
import  HighestProgress from '../../components/HighestProgressWidget/HighestProgress';
import  LiveDataWidget  from '../../components/LiveDataDashBoardWidget/LiveDataWidget';





const Dashboard2 = (props) => {
    let offset = 256;


    const [state, setState] = React.useState({
        loading: true,
        offset: 256,
        rooms: ["Room Alpha", "Room beta", "clone Room", "flower one", "flower two", "veg room a"],
        roomIndex: 0
    });


    

    const setRoom = (index) => {
        const cstate = state;
        cstate.roomIndex = index
        setState(cstate);

    }

    const checkOffset = () => {

    }

    return (
        <Container className={"containerMain"}>
            <Grid container direction={'column'} spacing={6}>
                <Grid
                    container item direction="row"
                    spacing={3} xs>
                    <DashboardSummery setRoom={setRoom} />
                </Grid>
                <Grid container item direction="row"
                    spacing={3} xs >
                    <SystemNotifications />
                    <Grid item></Grid>
                    <HighestProgress roomName={state.rooms[state.roomIndex]} />
                </Grid>
                <Grid container item direction="row"
                    spacing={3} xs >
                    <LiveDataWidget roomName={state.rooms[state.roomIndex]} />
                </Grid>
                {/* <Grid item direction="row" justify="center" alignItems="stretch" xs={12} spacing={3}> */}
            </Grid>
        </Container>
    );

}





function mapStateToProps({ state }) {
    return { state };
}

const formedComponent = compose(
    connect(mapStateToProps, { getRooms: getRooms, setRoom: setRoom })
)(Dashboard2);

export default requireAuth(formedComponent);
