import DeleteIcon from '@mui/icons-material/Delete';
import RuleIcon from '@mui/icons-material/Rule';
import EditIcon from '@mui/icons-material/Edit';

export const Task = (props) => {
    return(
        <tr>
        <td
        style={{ color: props.completed ? "green" : "black" }}>
            {props.taskName}
        </td>
        &nbsp;
        <td>
            <button onClick={()=>props.deleteTask(props.id)}><DeleteIcon /></button>
            &nbsp;
            <button onClick={()=>props.editTask(props.id)}><EditIcon /></button>
            &nbsp;
            <button onClick={()=>props.toggleDone(props.id)}><RuleIcon /></button>    
        </td>
        </tr>
      );
};