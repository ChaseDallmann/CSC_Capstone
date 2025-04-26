import React from "react";


export default ({ chats }) => (
  <ul>
    {chats.map(chat => {
      return (
        <div key={chat.id} >
          <div className="row show-grid">
            <div className="col-xs-12">

              <div className="chatMessage">
                <div className="box">
                  <p>
                    <strong>{chat.username}</strong>
                  </p>
                  <p>{chat.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </ul>
);
