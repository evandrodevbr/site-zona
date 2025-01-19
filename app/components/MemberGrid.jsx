"use client";

import { useLayoutEffect, useState } from 'react';
import { motion } from "motion/react";
import MemberCard from './MemberCard';

export default function MemberGrid({ members }) {
  const [columns, setColumns] = useState(3);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    setMounted(true);
    function updateColumns() {
      if (window.innerWidth >= 1024) {
        setColumns(3);
      } else if (window.innerWidth >= 768) {
        setColumns(2);
      } else {
        setColumns(1);
      }
    }

    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Reorganiza os membros em ordem horizontal para colunas
  const reorderedMembers = members.reduce((acc, member, i) => {
    const colIndex = i % columns;
    if (!acc[colIndex]) acc[colIndex] = [];
    acc[colIndex].push(member);
    return acc;
  }, Array(columns).fill().map(() => []));

  if (!mounted) {
    return (
      <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
        {members.map((member) => (
          <div key={member.name} className="mb-4 break-inside-avoid opacity-0">
            <MemberCard member={member} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {reorderedMembers.flat().map((member, index) => (
        <motion.div
          key={member.name}
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: [0.215, 0.61, 0.355, 1]
          }}
          className="mb-4 break-inside-avoid"
        >
          <MemberCard member={member} />
        </motion.div>
      ))}
    </div>
  );
} 