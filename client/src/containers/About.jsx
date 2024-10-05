import React from 'react'

import { motion } from "framer-motion";
import { L1,L2 ,about,a} from "../assets";
const About = () => {
  return (
    <section id="about" className="mt-32 flex items-center justify-center flex-col gap-12  ">
    {/* Title */}
    <div className="flex items-center justify-center py-24">
      <motion.div
        initial={{ opacity: 0, x: 0 }}
        animate={{ opacity: 1, x: 25 }}
        exit={{ opacity: 0, x: 0 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center space-x-2"
        style={{ maxWidth: '90%' }}
      >
        <img src={L1} className="w-6 h-auto object-contain" alt="" />
        <p className="text-black  font-bold uppercase text-xl font-serif tracking-widest" style={{ whiteSpace: 'nowrap' }}>About School</p>
        <img src={L2} className="w-6 h-auto object-contain" alt="" />
      </motion.div>
    </div>
      {/* Main content */}
      <div className="flex xs:-mt-16 flex-col lg:flex-row gap-8 w-full px-4 lg:px-8">
        {/* Content section */}
        <div className="flex-1 flex flex-col gap-6">

          <p className="text-textlight text-base tracking-wide text-justify">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ut at ipsa. Fugiat alias sed nobis! Porro, architecto! Laborum provident, blanditiis quisquam hic modi consectetur rem expedita enim temporibus. Praesentium.
          </p>
          <p className="text-textlight text-base tracking-wide text-justify">
            Eligendi dolorum ad sequi. Nihil voluptatum delectus maxime incidunt doloremque! Rem repellendus qui omnis aperiam cum est fugit ducimus odit numquam similique. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        {/* Image section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-[2px] rounded-md bg-gradient-to-br from-primary to-secondary relative">
            <img src={a} className="w-full h-auto rounded-md" alt="About Our School" />
            <div className="absolute w-full h-full -top-3 -left-2 bg-gradient-to-br from-primary to-secondary rounded-md blur-[5px] -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
