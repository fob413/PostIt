import React, { PropTypes } from 'react';

/**
 * @export
 * @class Message
 * @extends {React.Component}
 */
export const Message = props => (
  props.messageContent ?
   (<div className="container boardMessage">
     <div className="collection">
       <div className="collection-item avatar">
         <i className="material-icons circle">message</i>
         <h6 className="title">{props.messageContent}
           <br /><span>{props.messageAuthor}</span></h6>
       </div>
     </div>
   </div>) :
   (<div>
     <hr />
   </div>)
);

Message.propTypes = {
  messageContent: PropTypes.string,
  messageAuthor: PropTypes.string
};

export default Message;
