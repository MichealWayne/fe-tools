import React, {Component} from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { withRouter , Switch } from 'react-router-dom'
import '../less/AnimatedSwitch.less'
 
interface AnimatedSwitchProps {
    children?: any;
    type?: string;
    duration?: number;
}

@withRouter 
class AnimatedSwitch extends Component<any> {
  render () {
    const { 
        children,
        type = 'fade',
        duration = 1000,
        location,
    } = this.props;
    
    return (
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              classNames={type} 
              timeout={duration}
            >
              <Switch location={location}>{children}</Switch>
            </CSSTransition>
          </TransitionGroup>
    )
  }
}
 
export default AnimatedSwitch