import React, { useEffect } from 'react';
import { connect, useSelector, shallowEqual } from "react-redux";
import { compose } from "redux";
import { Grid, Typography, Menu, MenuItem } from '@material-ui/core';
import { makeStyles, } from '@material-ui/core/styles'; //useTheme
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import ErrorRoundedIcon from '@material-ui/icons/ErrorRounded';
// import BrokenImageIcon from '@material-ui/icons/BrokenImage';
// import InfoIcon from '@material-ui/icons/Info';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
// import FixedSizeList  from 'react-window/src/FixedSizeList';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
// import { addGrowRoom, fetchUserGrowRoomsAndStatus } from "../../actions";

import { sampleNotifications } from "../../exampleDataTypes/clientExamlpeDataTypes";
import {FetchAlarms} from '../../actions/LiveData';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css'; //


const useStyles = makeStyles((theme) => ({
    notificationsWidget: {
        background: theme.palette.secondary.main,
        color: theme.palette.text.main,
        padding: "24px",
        paddingLeft: "8px",
        minHeight: "364px",
        marginTop: "8px",
        marginBottom: "8px",
        '@media (max-width: 1500px)': {
            minWidth: "512px",
            maxWidth: "832px",

        },
        '@media (max-width: 1200px)': {
            minWidth: "448px",
            maxWidth: "640px",

        },
        '@media (max-width: 992px)': {
            minWidth: "320px",
            maxWidth: "512px",

        },
        '@media (max-width: 705px)': {
            minWidth: "256px",
            maxWidth: "320px",

        },
        '@media (max-width: 640px)': {
            minWidth: "320px",
            maxWidth: "512px",

        },
        '@media (max-width: 460px)': {
            minWidth: "300px",
            maxWidth: "300px",

        },
        '@media (max-width: 400px)': {
            minWidth: "256px",
            maxWidth: "256px",

        },
        '@media (max-width: 330px)': {
            minWidth: "212px",
            maxWidth: "212px",

        }
    },
    headerText: {
        '@media (max-width: 460px)': {
            fontSize: 14,

        },
        '@media (max-width: 400px)': {
            fontSize: 14,

        },
        '@media (max-width: 330px)': {
            fontSize: 12,

        }
    },
    notificationsList: {
        minWidth: "256px",
        maxWidth: "812px",
        width: "100%",
    },
    iconButton: {
        color: "white",
        height: "48px",
        width: "48px",
        marginRight: "48px"
    },
    listItemIcon: {
        color: theme.palette.text.main,
        '@media (max-width: 460px)': {


        },
        '@media (max-width: 400px)': {
            marginRight: "-24px"

        },
        '@media (max-width: 320px)': {
            fontSize: "medium"

        }
    },
    warning: {
        // background:theme.palette.roomStatus.warning,
        background: theme.palette.primary.main
    },
    warningItem: {
        background: theme.palette.primary.main,
        borderRadius: "12px",
        // padding: "2px",
        // marginLeft: "8px",
        // marginRight: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        marginTop: "4px",
        marginBottom: "4px",
    },
    warningText: {
        background: theme.palette.primary.main,
        borderRadius: "12px",
        padding: "2px",
        // marginLeft: "8px",
        // marginRight: "8px",
        paddingLeft: "8px",
        // paddingRight: "8px",
        marginTop: "4px",
        marginBottom: "4px",
    },
    fault: {
        // background:theme.palette.roomStatus.fault,
        color: theme.palette.text.main
    },
    faultItem: {
        background: theme.palette.roomStatus.warning,
        borderRadius: "12px",
        // padding: "2px",
        // marginLeft: "8px",
        // marginRight: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        marginTop: "4px",
        marginBottom: "4px",
    },
    faultText: {
        background: theme.palette.roomStatus.warning,
        borderRadius: "12px",
        padding: "2px",
        paddingLeft: "8px",
        paddingRight: "8px",
        // marginLeft: "8px",
        // marginRight: "8px"

    },
    info: {
        // background:theme.palette.secondary.main,
        color: theme.palette.secondary.main
    },
    infoItem: {
        background: theme.palette.secondary.main,
        borderRadius: "12px",
        // padding: "2px",
        // marginLeft: "8px",
        // marginRight: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        marginTop: "4px",
        marginBottom: "4px",
    },
    infoText: {
        background: theme.palette.secondary.main,
        borderRadius: "12px",
        padding: "2px",
        marginLeft: "8px",
        marginRight: "8px",
        paddingLeft: "8px",
        paddingRight: "8px",
        // color: theme.palette.secondary.main
    },
    globalListItemQueries: {
        '@media (max-width: 705px)': {
            maxWidth: "236px"

        },
        '@media (max-width: 640px)': {
            minWidth: "310px",
            maxWidth: "448px",

        },
        '@media (max-width: 460px)': {
            minWidth: "224px",
            maxWidth: "256px"

        },
        '@media (max-width: 400px)': {
            minWidth: "200px",
            maxWidth: "224px"

        },
        '@media (max-width: 330px)': {
            minWidth: "128px",
            maxWidth: "192px"

        }
    },
    globalListItemText: {
        "& .MuiTypography-displayBlock": {
            '@media (max-width: 705px)': {
                fontSize: 12,

            },
            '@media (max-width: 640px)': {
                fontSize: 14,

            },
            '@media (max-width: 460px)': {
                fontSize: 12,

            },
            '@media (max-width: 400px)': {
                fontSize: 10,

            },
            '@media (max-width: 330px)': {
                fontSize: 8,

            }
        }

    }

}));






const SystemNotifications = (props) => {
    const classes = useStyles();
    // const theme = useTheme();
    let { alarms,  user} = useSelector(state => ({
        alarms: state.growRooms.Alarms,
        user: state.users.user,
    }), shallowEqual);

    useEffect(() => {
        if(user && user.firstName && !alarms.alarmList){
            if(user.ownerID){
            
                props.FetchAlarms(user.ownerID, alarms);
            }else{
                props.FetchAlarms(user.UID, alarms);
            }
        }
    });
    const [state, setState] = React.useState({ //setState
        allnotifications: sampleNotifications,
        notifications: sampleNotifications,
        pick: 2
    });
    const options = [
        'Warning',
        'FAULT',
        'All'];



    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setState({
            ...state,
            pick: event.target.value
        })
        setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;
    //xs={12} sm={6} md

    ///Grid stuff
    const [gridApi, setGridApi] = React.useState(null);
    // const [gridColumnApi, setGridColumnApi] = React.useState(null);


    function onGridReady(params) {
        setGridApi(params.api);
        // setGridColumnApi(params.columnApi);
    }

    const notificationType = (props) => {
        const active = props.value;
        // const { nominal, fault } = props;
        const mainStyle = {
            width: "12px",
            height: "12px",
            borderRadius: "6px",
            margin: "8px"
        }

        switch (active) {
            case "FAULT":
                return (<div style={{ ...mainStyle }}></div>); //<BrokenImageIcon/> 
            case "warning":
                return (<div style={{ ...mainStyle }}> </div>);//<ErrorRoundedIcon />
            default:
                return (<div></div>);
        }
    };

    const generateTimestamp = (props) => {
        const activeTime = moment.unix(props.value);
        const mainStyle = {
            width: "12px",
            height: "12px",
            borderRadius: "6px",
            margin: "8px"
        }
        return (<div style={{ ...mainStyle }}>{activeTime.format('HH:mm, MM:DD:YYYY')} </div>)
    }   

    if (gridApi) {
        if (state.pick === 2) {
            // console.log('destroy')
            gridApi.setFilterModel({

            });
        } else {
            gridApi.setFilterModel({
                type: {
                    filterType: "string",
                    type: 'startsWith',
                    filter: options[state.pick]
                }
            });
        }
        // console.log('filterState: ', filterState);
        // props.setRoom(event.target.value);
        gridApi.onFilterChanged();

    }
    let alarmDisplayList = [];
    if(!alarms || !alarms.alarmList ||alarms.alarmList.length === 0){
        alarmDisplayList = sampleNotifications;
    }
    if(alarms && alarms.alarmList && alarms.alarmList.length > 0){
        alarmDisplayList = alarms.alarmList;
    }

    return (
        <Grid container item className={classes.notificationsWidget} xs justify={"center"} spacing={1} direction={"row"}>
            {/* <Grid container item xs direction={"row"}> */}
                <Grid container item xs={8}>
                    <Typography variant={"h5"} className={classes.headerText} style={{ paddingLeft: "12px" }}>System Notifications ({state.notifications.length})</Typography>
                </Grid>
                <Grid container item xs>

                </Grid>
                <Grid container item xs={1}>
                    <IconButton
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        aria-label="Widget Settings" color="primary" className={classes.iconButton}><MoreVertIcon /></IconButton>
                    <Menu
                        id="long-menu"
                        anchorEl={anchorEl}
                        value={state.pick}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '20ch',
                            },
                        }}
                    >
                        {options.map((option, index) => (
                            <MenuItem key={option} value={index} selected={option === 'Pyxis'} onClick={handleClose}>
                                {option}
                            </MenuItem>
                        ))}
                    </Menu>
                </Grid>
            {/* </Grid> */}
            <Grid container item xs={12}>
                {/* <List className={classes.notificationsList}>
                    {<NotificationsListItems pick={state.pick}/>}
                </List> */}
                <div style={{ minHeight: '300px', minWidth: '200px', width: "98%" }} className="ag-theme-alpine-dark" >
                    <AgGridReact
                        rowData={alarmDisplayList}
                        animateRows={true}
                        defaultColDef={{
                            
                            minWidth: 10,
                            sortable: true,
                            filter: true,
                        }}
                        rowClassRules={{
                            'warningNotification': function (params) {
                                var type = params.data.type;
                                return type === "warning";
                            },
                            'faultNotification': (params) => {
                                var type = params.data.type;
                                return type === "FAULT";
                            },
                        }}
                        frameworkComponents={{
                            notificationType: notificationType,
                            timeStamp:generateTimestamp,
                        }}
                        onGridReady={onGridReady}>
                        <AgGridColumn resizable field="type" sortable={true} filter={true}
                            maxWidth={24} cellRenderer={"notificationType"}></AgGridColumn>
                        <AgGridColumn field="room" sortable={true} filter={true} ></AgGridColumn>
                        <AgGridColumn flex={1}  headerName={"Message"} field="msg" sortable={true}></AgGridColumn>
                        <AgGridColumn  field="unixTime" sortable={true} cellRenderer={"timeStamp"}></AgGridColumn>

                    </AgGridReact>
                </div>
            </Grid>
            {/* <Grid container item xs justify={"center"}>
                <Button variant="outlined" color="primary" style={{ width: "192px", height: "48px" }}>
                    Show {state.notifications.length - 4} more
                </Button>
            </Grid> */}
        </Grid>
    )
}

function mapStateToProps({ state }) {
    return { state };
}

const alarmActions = {
    FetchAlarms:FetchAlarms
}

const formedComponent = compose(connect(mapStateToProps, alarmActions))(SystemNotifications);

export default formedComponent;
