'use client';

import { useAuth } from '@/hooks/useAuth';
import { roleService } from '@/lib/services/roleService';
import { useState } from 'react';

export default function TestAuthPage() {
  const { isAuthenticated, isLoading, error, autoLogin, user } = useAuth();
  const [testResult, setTestResult] = useState<string>('');

  const handleTestAutoLogin = async () => {
    setTestResult('Testing auto login...');
    try {
      await autoLogin();
      setTestResult('Auto login successful!');
    } catch (err) {
      setTestResult(`Auto login failed: ${err}`);
    }
  };

  const handleTestAPI = async () => {
    setTestResult('Testing API call...');
    try {
      const response = await fetch('http://localhost:8000/api/roles', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setTestResult(`API call successful: ${JSON.stringify(data, null, 2)}`);
      } else {
        setTestResult(`API call failed: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setTestResult(`API call error: ${err}`);
    }
  };

  const handleTestBackend = async () => {
    setTestResult('Testing backend connectivity...');
    try {
      const result = await roleService.testBackend();
      setTestResult(`Backend test result: ${JSON.stringify(result, null, 2)}`);
    } catch (err) {
      setTestResult(`Backend test error: ${err}`);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Test Authentication</h1>
      
      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="font-semibold mb-2">Status:</h2>
          <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
          <p>Loading: {isLoading ? 'Yes' : 'No'}</p>
          <p>Error: {error || 'None'}</p>
          <p>User: {user ? JSON.stringify(user, null, 2) : 'None'}</p>
          <p>Token: {localStorage.getItem('auth_token') || 'None'}</p>
        </div>

        <div className="space-x-2">
          <button
            onClick={handleTestAutoLogin}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Test Auto Login
          </button>
          
          <button
            onClick={handleTestAPI}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Test API Call
          </button>
          
          <button
            onClick={handleTestBackend}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Test Backend
          </button>
        </div>

        {testResult && (
          <div className="p-4 bg-gray-100 rounded">
            <h3 className="font-semibold mb-2">Test Result:</h3>
            <pre className="text-sm whitespace-pre-wrap">{testResult}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
