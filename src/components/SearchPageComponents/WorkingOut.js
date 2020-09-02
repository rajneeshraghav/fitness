import React from "react";
import Workout from "../PlayerAndCarousel/Workout/Workout";

class WorkingOut extends React.Component {
 
  render() {
    return (
      <React.Fragment>
        {this.props.classes.map((c, index) => (
          <Workout
            key={index}
            //thumbnail={c.thumbnail}
            thumbnail={`${c.thumbnail}?width=350`}
            url={c.url}
            title={c.title}
            duration={c.duration}
            description={c.description}
            clicked={() => this.props.onClickHandler(c.id)}
            show={true}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default WorkingOut;
