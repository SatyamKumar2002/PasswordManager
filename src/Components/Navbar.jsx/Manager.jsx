import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

function Manager() {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  const [currentlyEditingId, setCurrentlyEditingId] = useState(null);

  useEffect(() => {
    try {
      let passwords = localStorage.getItem("passwords");
      if (passwords) {
        setPasswordArray(JSON.parse(passwords));
      }
    } catch (error) {
      console.error("Failed to load passwords:", error);
      localStorage.removeItem("passwords");
    }
  }, []);

  const copyText = (text) => {
    toast('📋 Copied to clipboard!', { position: "top-right", autoClose: 3000 });
    navigator.clipboard.writeText(text);
  }

  const showPassword = () => {
    if (ref.current.src.includes("icons/crosseye.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/crosseye.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      if (currentlyEditingId) {
        const updatedArray = passwordArray.map(item =>
          item.id === currentlyEditingId ? { ...form, id: currentlyEditingId } : item
        );
        setPasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
        toast('🛠️ Password updated!');
      } else {
        const newEntry = { ...form, id: uuidv4() };
        const updatedArray = [...passwordArray, newEntry];
        setPasswordArray(updatedArray);
        localStorage.setItem("passwords", JSON.stringify(updatedArray));
        toast('✅ Password saved!');
      }
      setform({ site: "", username: "", password: "" });
      setCurrentlyEditingId(null);
    } else {
      toast('❌ Error: Please fill all fields!');
    }
  };

  const deletePassword = (id) => {
    const confirmed = confirm("Do you really want to delete this password?");
    if (confirmed) {
      const updated = passwordArray.filter(item => item.id !== id);
      setPasswordArray(updated);
      localStorage.setItem("passwords", JSON.stringify(updated));
      toast('🗑️ Password Deleted!');
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find(i => i.id === id);
    if (passwordToEdit) {
      setform({ site: passwordToEdit.site, username: passwordToEdit.username, password: passwordToEdit.password });
      setCurrentlyEditingId(id);
    }
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="p-2 md:p-0 md:mycontainer min-h-[70vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">Manager/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Your password Manager</p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 w-full p-4 py-1"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter username"
              className="rounded-full border border-green-500 w-full p-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="rounded-full border border-green-500 w-full p-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span className="absolute right-[4px] top-[9px] cursor-pointer" onClick={showPassword}>
                <img ref={ref} className="p-1" width={25} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={savePassword}
              className="flex justify-center items-center gap-2 bg-green-500 hover:bg-green-400 rounded-full px-8 py-2 w-fit border border-green-900"
            >
              <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
              {currentlyEditingId ? "Update Password" : "Add Password"}
            </button>

            {currentlyEditingId && (
              <button
                onClick={() => {
                  setform({ site: "", username: "", password: "" });
                  setCurrentlyEditingId(null);
                  toast.info("✖️ Edit cancelled");
                }}
                className="flex justify-center items-center gap-2 bg-red-500 hover:bg-red-400 rounded-full px-8 py-2 w-fit border border-red-900"
              >
              Cancel
              </button>
            )}
          </div>

          <div className="passwords">
            <h2 className="font-bold text-2xl py-2">Your Passwords</h2>
            {passwordArray.length === 0 && <div>No passwords to show</div>}
            {passwordArray.length > 0 && (
              <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                <thead className="bg-green-800 text-white">
                  <tr>
                    <th className="py-2">Site</th>
                    <th className="py-2">Username</th>
                    <th className="py-2">Password</th>
                    <th className="py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-green-100">
                  {passwordArray.map((item) => (
                    <tr key={item.id}>
                      <td className="text-center w-80 py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank" rel="noreferrer">{item.site}</a>
                          <div className="cursor-pointer ml-2" onClick={() => copyText(item.site)}>
                            📋
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-80 py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div className="cursor-pointer ml-2" onClick={() => copyText(item.username)}>
                            📋
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-80 py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div className="cursor-pointer ml-2" onClick={() => copyText(item.password)}>
                            📋
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-80 py-2 border border-white">
                        <button className="mx-1" onClick={() => editPassword(item.id)}>✏️</button>
                        <button className="mx-1" onClick={() => deletePassword(item.id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Manager;
