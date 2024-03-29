import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import Head from 'next/head';
import {BsFillMoonStarsFill} from 'react-icons/bs';
import {AiFillLinkedin, AiFillGithub, AiFillInstagram} from 'react-icons/ai';
import { Link } from 'react-scroll';
import Image from 'next/image';
import profile from '../public/Profile.png';
import camera from '../public/Camera-icon.png';

import engine from '../public/engine-icon.png';
import snake from '../public/Snake-icon.png';
import icon from '../public/Fisherlogo-uncoloured.png';
import { useState } from 'react';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  const form = useRef();

  const handleClick = event => {
    event.currentTarget.disabled = true;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    alert('Message and Email Sent');

    emailjs.sendForm('service_ee2hj7e', 'template_5epjmmt', form.current, '6Hu61AIFmhuh0QOUq')
      .then((result) => {
          console.log(result.text);
          console.log('messge sent')
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Welcome to my site!</title>
        <meta name="description" content="Generated by cre"></meta>
        <link rel="icon" href="Fisherlogo-uncoloured.png"/>
      </Head>
      <main className=' bg-white px-10 dark:bg-gray-900'>
        <section className=' h-screen' id='introduction'>
          <nav className='py-10 mb-12 flex justify-between'>
            <h1 className='text-xl px-2 py-2 rounded-md bg-violet-400'>Fisher Obillos</h1>
            <ul className='flex items-center'>
              <li>
                <Image src={icon} width={80} height={80} className=" object-contain"/>
              </li>
              <li>
                <a 
                  className='bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md ml-8' 
                  href="WebResume.pdf">
                  Resume
                </a>
                <Link smooth
                  className='cursor-pointer bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md ml-8' 
                  to="projects">
                  Projects
                </Link>
                <Link smooth
                  className='cursor-pointer bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md ml-8'
                  to='about'>
                  About
                </Link>
                <Link smooth
                  className='cursor-pointer bg-violet-400 hover:bg-violet-500 text-white px-4 py-2 rounded-md ml-8'
                  to='contact'>
                  Connect
                </Link>
              </li>
            </ul>
          </nav>
          <div className='text-center p-10 py-5'>
            <h2 className=' text-5xl py-2 text-violet-400'>Fisher Obillos</h2>
            <h3 className='text-2xl py-2 text-gray-800'>Computer Science Student</h3>
            <p className='text-xl py-2 leading-8 text-gray-700'>
              Hey there! I'm Fisher and I'm a computer science student at the University of Waterloo! 
              I've been interested in technology from a young age and really enjoy creating fun projects. Let's connect!
            </p>
          </div>
          <ul className='flex items-center justify-center'>
            <li>
              <div className='text-5xl flex justify-center gap-16 py-1 px-3 text-gray-600 hover:text-gray-700'>
                <a href="https://www.linkedin.com/in/fisher-obillos-33054b255/" target= "_blank">
                  <AiFillLinkedin/>
                </a>
              </div>
            </li>
            <li>
              <div className='text-5xl flex justify-center gap-16 py-1 px-3 text-gray-600 hover:text-gray-700'>
                <a href="https://github.com/BrodyFisher" target= "_blank">
                  <AiFillGithub/>
                </a>
              </div>
            </li>
            <li>
              <div className='text-5xl flex justify-center gap-16 py-2 px-3 text-gray-600 hover:text-gray-700'>
                <a href="https://www.instagram.com/fisherobillos/" target= "_blank">
                  <AiFillInstagram/>
                </a>
              </div>
            </li>
          </ul>
          <div className='overflow-hidden relative mx-auto bg-gradient-to-b from-violet-400  rounded-full w-80 h-80 py-2 mt-10'>
            <Image src={profile}/>
          </div>
        </section>
        <section id='projects'>
          <div>
            <h3 className='text-black text-5xl py-2'>Past Projects: </h3>
            <p className='text-black text-md leading-8'>
              Shown below is a list of a few of my completed projects.
            </p>
          </div>
          <div>
          <a href="https://github.com/BrodyFisher/OpenCV" target="_blank">
            <div className='border-2 mx-auto text-center shadow-lg p-10 rounded-xl my-10 hover:shadow-2xl hover:border-violet-400'>
              <div className='flex justify-center'>
                <Image src={camera} width={100} height={100} />
              </div>
              <h3 className='text-black py-2'>
                OpenCV Face Filter
              </h3>
              <p className='text-black py-2'>
                Uses the OpenCV library in C++, in order to detect the face of an individual and further detect if that individual is smiling.
                If they are, the program will display their face with a smile drawn onto it. If the user is not smiling, their will be a frowny
                face drawn onto the video.
              </p>
            </div>
          </a>
            <a href="https://github.com/BrodyFisher/Snake" target="_blank">
              <div className='border-2 mx-auto text-center shadow-lg p-10 rounded-xl mt-10 mb-20 hover:shadow-2xl hover:border-violet-400'>
                <div className='flex justify-center'>
                  <Image src={snake} width={100} height={100} />
                </div>
                <h3 className='text-black py-2 mt-5'>
                  Snake Game in Pygame
                </h3>
                <p className='text-black py-2'>
                  This simple rendition of the popular computer game "snake" was created using the "Pygame" module in python.
                  This project served as my very first complete project using python and was also the first time I decided to
                  create a game!
                </p>
              </div>
            </a>
            <a href="https://github.com/BrodyFisher/ASCII-Game-Engine" target="_blank">
            <div className='border-2 mx-auto text-center shadow-lg p-10 rounded-xl my-10 hover:shadow-2xl hover:border-violet-400'>
              <div className='flex justify-center'>
                <Image src={engine} width={100} height={100} />
              </div>
              <h3 className='text-black py-2'>
                ASCII Art Game Engine
              </h3>
              <p className='text-black py-2'>
                A game engine written in C++ that allows for the creation of ASCII art video games to be played in the terminal. The engine use the ncurses library as the primary way of displaying graphics to the screen.
              </p>
            </div>
          </a>
          </div>
        </section>
        <section className=' h-screen ' id='about'>
          <h1 className='text-black text-5xl'>About Me</h1>
          <p className='text-black py-2'>A few things about me.</p>
          <div class=" border border-black w-8/12 overflow-hidden mx-auto rounded-xl bg-violet-400 shadow-lg">
            <div className='bg-violet-400 table-cell align-middle w-4/12'>
              <h2 className=' pr-1 text-center font-medium text-xl' >Here's a list of my relevant, computer related skills, in no particular order;</h2>
            </div>
            <div className='table-cell align-middle w-4/12 bg-neutral-200 text-black'>
              <ul>
                <li>
                  <h2 className='text-xl p-2'></h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Well versed in problem solving.</h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Have been interested in computers and programming from a young age.</h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Two years, intermediate experience with C/C++.</h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Experience writing modular programs.</h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Experience with Python.</h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Well versed in computer vision, particularly using OpenCV in C++.</h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Familiar with hardware and electronics due to FTC/FRC involvement in high school.</h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Extreme interest and enthusiasm to work with others and create projects!</h2>
                </li>
                <li>
                  <h2 className='text-xl p-2'>Always excited to learn something new and expand my personal skillset! :)</h2>
                </li>
              </ul>
            </div>
          </div>
        </section>
        <section className=' h-screen' id='contact'>
          <h1 className='text-black text-5xl'>Connect With Me</h1>
          <p className='text-black text-md leading-8'>
              Get in contact with me via email!
          </p>
          <div className='flex justify-center rounded-lg'>
            <form ref={form}  onSubmit={sendEmail} class=" block border-2 bg-white shadow-lg rounded-lg mt-20 w-8/12 hover:border-violet-400">
              <label class="  p-5 block text-black text-lg font-bold mb-2" for="username">
                  Name
              </label>
              <input placeholder='Name' type="text" name="from_name" className="flex justify-center shadow border border-violet-400 bg-white rounded w-11/12 p-5  text-black mb-3"/>
              <label class=" p-5 block text-black text-lg font-bold mb-2" for="username">
                  Email
              </label>
              <input placeholder='example@gmail.com' type="email" name="from_email" className=" flex justify-center shadow border border-violet-400 bg-white rounded w-11/12 p-5  text-black mb-3"/>
              <label class=" p-5 block text-black text-lg font-bold mb-2">
                  Message
              </label>
              <textarea placeholder='Message' name="message" className=" flex justify-center shadow border border-violet-400 bg-white rounded w-11/12 p-5  text-black mb-3"/>
              <input type="submit" value="Send" className='flex justify-center bg-violet-400 rounded-lg px-10 py-4 hover:bg-violet-500 m-10'/>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
