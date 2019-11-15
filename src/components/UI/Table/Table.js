import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '../../UI/Button/Button'
import {NavLink} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
});

export default function SimpleTable(props) {
    const classes = useStyles();



    return (
        <Paper className={classes.root}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">id</TableCell>
                        <TableCell align="right">first_name</TableCell>
                        <TableCell align="right">last_name</TableCell>
                        <TableCell align="right">email</TableCell>
                        <TableCell align="right">actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.users.map( user => (
                        <TableRow key={user.id}>
                            <TableCell component="th" scope="row">{user.id}</TableCell>
                            <TableCell align="right">{user.first_name}</TableCell>
                            <TableCell align="right">{user.last_name}</TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">
                                <NavLink to={'/user/' + user.id + '/edit'}>
                                    <Button type="success">
                                        edit
                                    </Button>
                                </NavLink>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}