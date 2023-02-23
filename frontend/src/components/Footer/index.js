import React from 'react';
// import mzonelogo from '../../img/mzonelogo.png'
import githublogo from '../../images/github.png'
import linkedin from '../../images/linkedin.png'
import portfolio from '../../images/portfolio-cici.png'
import angellist from '../../images/angellist.png'
import './Footer.css';

export default function Footer() {

    return (
        <div className='footer-container'>
            <div className='footer-container-inner'>

                <div className='nav-bar-middle-container'>
                    <div className='footer-links'>
                        <span className='footer-logoname1'>Created by Cici Cheng</span>
                    </div>
                    <div className='footer-logo-container'>
                        <a href='https://cici1819.github.io/' target="_blank">
                            <div className='footer-links'>
                                <img src={portfolio} alt='linkedin' />
                                <div className='footer-logoname'>Portfolio</div>
                            </div>
                        </a>
                    </div>
                    <div className='footer-logo-container'>
                        <a href='https://www.linkedin.com/in/cici-cheng-87386a259/' target="_blank">
                            <div className='footer-links1'>
                                <img src={linkedin} alt='linkedin' />
                                <div className='footer-logoname'>LinkedIn</div>
                            </div>
                        </a>
                    </div>

                    <div className='footer-logo-container'>
                        <a href='https://github.com/cici1819' target="_blank">
                            <div className='footer-links'>
                                <img src={githublogo} alt='github' />
                                <div className='footer-logoname'>GitHub</div>
                            </div>
                        </a>
                    </div>

                </div>

            </div>
        </div>
    )


}
