import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, User, Trash2 } from 'lucide-react';

interface Member { id: string; name: string; role: string; progress: number }

export function TeamManagement() {
  const [members, setMembers] = useState<Member[]>([
    { id: '1', name: 'Alice', role: 'Lead Engineer', progress: 75 },
    { id: '2', name: 'Bob', role: 'Product Manager', progress: 40 },
  ]);

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Team Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      <div className="space-y-4">
        {members.map(member => (
          <div key={member.id} className="flex items-center justify-between p-4 border rounded-xl dark:border-gray-700">
            <div className="flex items-center gap-4">
              <User className="w-8 h-8 text-gray-400" />
              <div>
                <p className="font-bold text-gray-900 dark:text-white">{member.name}</p>
                <p className="text-sm text-gray-500">{member.role}</p>
              </div>
            </div>
            <div className="flex-1 max-w-xs mx-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${member.progress}%` }}></div>
              </div>
            </div>
            <button className="text-red-500"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
