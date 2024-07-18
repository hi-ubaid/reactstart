export const User = (props) => {
    return(
      <div>
        <h1>Name: {props.name}</h1>
        <h1>Age: {props.age}</h1>
        <h2>Position: {props.position}</h2>
        <h2>Company: {props.company}</h2>
      </div>
    );
  }

