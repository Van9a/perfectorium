import React from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Check from "@material-ui/icons/Check";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import StepConnector from "@material-ui/core/StepConnector";
import Button from "@material-ui/core/Button";
import { TiThList, TiTick, TiTicket } from 'react-icons/ti';
import './styes.scss'

const useQontoStepIconStyles = makeStyles({
    root: {
        color: "#eaeaf0",
        display: "flex",
        height: 22,
        alignItems: "center"
    },
    active: {
        color: "#784af4"
    },
    circle: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor"
    },
    completed: {
        color: "#00b7bd",
        zIndex: 1,
        fontSize: 18
    }
});

function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active
            })}
        >
            {completed ? (
                <Check className={classes.completed}/>
            ) : (
                <div className={classes.circle}/>
            )}
        </div>
    );
}

QontoStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool
};

const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22
    },
    active: {
        "& $line": {
            backgroundColor: '#00b7bd'
        }
    },
    completed: {
        "& $line": {
            backgroundColor: '#00b7bd'
        }
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#00b7bd",
        borderRadius: 1
    }
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: "#ccc",
        zIndex: 1,
        color: "#fff",
        width: 50,
        height: 50,
        display: "flex",
        borderRadius: "50%",
        justifyContent: "center",
        alignItems: "center"
    },
    active: {
        border: '1px solid #00b7bd',
        backgroundColor: '#fff',
        color: '#00b7bd',
        boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)"
    },
    completed: {
        backgroundColor: '#00b7bd'
    }
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <TiThList/>,
        2: <GroupAddIcon/>,
        3: <TiTick/>,
        4: <TiTicket/>
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node
};

const useStyles = makeStyles(theme => ({
    root: {
        width: "100%"
    },
    button: {
        backgroundColor: '#eeaa79',
        marginLeft: 'auto',
        marginTop: 20
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    }
}));

function getSteps() {
    return ["1. Step", "2. Step", "3. Step", "4. Step"];
}

export default function CustomizedSteppers() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(1);
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    return (
        <div className={clsx(classes.root, 'main')}>
            <Stepper
                alternativeLabel
                activeStep={activeStep}
                connector={<ColorlibConnector/>}
            >
                {steps.map(label => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div className="main__content">
                <div className="main__content-container">
                    <div><input type="checkbox"/> I agree to the <a href="#">Terms and Conditions</a></div>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                    >
                        Dispatch
                    </Button>
                </div>
            </div>
        </div>
    );
}
