import React from 'react';
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import MailIcon from "@material-ui/icons/Mail";

const Footer = ()=>{
    return (
      //   <div className="foot"
      //   style={{ textAlign: "center", width: "100%", paddingBottom: "20px" }}
      // >
      //   <footer style={{ bottom: 0, paddingTop: "20px" }}>
      //     <p style={{ marginTop: "20px", textAlign: "center", color: "#aaa" }}>
      //       {" "}
      //       Copyright © 2021{" "}
      //       <span style={{ color: "#ea0599" }}>Karishma Vanwari</span>
      //     </p>
      //     <div>
      //       <a href="https://github.com/KarishmaVanwari" target="_blank">
      //         <GitHubIcon style={{ marginRight: "10px", fontSize: 27 }} />
      //       </a>
      //       <a
      //         href="https://www.linkedin.com/in/karishma-vanwari-a1a025204/"
      //         target="_blank"
      //       >
      //         <LinkedInIcon style={{ marginRight: "10px", fontSize: 30 }} />
      //       </a>
      //       <a href="mailto:karishmagvanwari@gmail.com" target="_blank">
      //         <MailIcon style={{ marginRight: "10px", fontSize: 30 }} />
      //       </a>
      //     </div>
      //   </footer>
      // </div>
      <>
      <footer className="foot">
        <span>
             Copyright © 2021 {" "}
             <span style={{ color: "deepskyblue", fontWeight: 500 }}>Karishma Vanwari</span>
           </span>
           <div style={{marginTop: 10}}>
             <a href="https://github.com/KarishmaVanwari" target="_blank">
               <GitHubIcon style={{ marginRight: "10px", fontSize: 27 }} />
             </a>
             <a
              href="https://www.linkedin.com/in/karishma-vanwari-a1a025204/"
              target="_blank"
            >
              <LinkedInIcon style={{ marginRight: "10px", fontSize: 30 }} />
            </a>
            <a href="mailto:karishmagvanwari@gmail.com" target="_blank">
              <MailIcon style={{ marginRight: "10px", fontSize: 30 }} />
            </a>
          </div>
      </footer>
      </>
    );
}


export default Footer;