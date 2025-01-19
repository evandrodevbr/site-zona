"use client";

import { useEffect, useState } from 'react';
import MemberCard from './MemberCard';

export default function MemberGrid({ members }) {
  const [columns, setColumns] = useState(3);

  useEffect(() => {
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

  return (
    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
      {reorderedMembers.flat().map((member) => (
        <div key={member.name} className="mb-4 break-inside-avoid">
          <MemberCard member={member} />
        </div>
      ))}
    </div>
  );
} 