import { List } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import BarChartIcon from "@material-ui/icons/BarChart";
import DashboardIcon from "@material-ui/icons/Dashboard";
import { useHistory, useRouteMatch } from "react-router";

const MainListItems = (props) => {
  const history = useHistory();
  const match = useRouteMatch();
  return (
    <List>
      <ListItem
        button
        onClick={() => {
          props.handleLabel("Home");
          history.push(`${match.url}`);
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.handleLabel("Account List");
          history.push(`${match.url}/account`);
        }}
      >
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>

      <ListItem
        button
        onClick={() => {
          props.handleLabel("Report");
          history.push(`${match.url}/chart`);
        }}
      >
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItemText primary="Reports" />
      </ListItem>

      {/* <ListItem
        button
        onClick={() => {
          props.handleLabel("Test");
          history.push(`${match.url}/test`);
        }}
      >
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Integrations" />
      </ListItem> */}
    </List>
  );
};

export default MainListItems;
