import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { Trash2, Edit2, Plus, Image as ImageIcon, Package as PackageIcon, LogOut, Settings, Key } from 'lucide-react';

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId: string | undefined;
    email: string | null | undefined;
    emailVerified: boolean | undefined;
    isAnonymous: boolean | undefined;
    tenantId: string | null | undefined;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const AdminPanel = () => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'packages' | 'gallery' | 'settings'>('packages');

  const [packages, setPackages] = useState<any[]>([]);
  const [gallery, setGallery] = useState<any[]>([]);

  // Form states
  const [pkgForm, setPkgForm] = useState({ id: '', title: '', price: '', features: '', description: '', highlight: false, isDaily: false });
  const [imgForm, setImgForm] = useState({ id: '', imageUrl: '', title: '' });

  // Auth states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [deleteConfirm, setDeleteConfirm] = useState<{type: 'package' | 'gallery', id: string} | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser && currentUser.email === 'nibedikahostel11@gmail.com') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const unsubPackages = onSnapshot(collection(db, 'packages'), (snapshot) => {
      const pkgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPackages(pkgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'packages');
    });

    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      const imgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGallery(imgs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'gallery');
    });

    return () => {
      unsubPackages();
      unsubGallery();
    };
  }, [isAdmin]);

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login error", error);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginMessage('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: any) {
      if (email === 'nibedikahostel11@gmail.com' && (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found')) {
         try {
           await createUserWithEmailAndPassword(auth, email, password);
           return;
         } catch (createErr: any) {
           if (createErr.code === 'auth/email-already-in-use') {
              setLoginError('ভুল পাসওয়ার্ড। অনুগ্রহ করে আবার চেষ্টা করুন।');
           } else {
              setLoginError(createErr.message);
           }
         }
      } else {
        setLoginError('লগইন ব্যর্থ হয়েছে। ইমেইল বা পাসওয়ার্ড সঠিক নয়।');
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setLoginError('অনুগ্রহ করে প্রথমে আপনার ইমেইল ঠিকানা লিখুন।');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setLoginMessage('পাসওয়ার্ড রিসেট লিংক আপনার ইমেইলে পাঠানো হয়েছে।');
      setLoginError('');
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await updatePassword(user, newPassword);
      setPasswordMessage('পাসওয়ার্ড সফলভাবে পরিবর্তন করা হয়েছে!');
      setNewPassword('');
      setPasswordError('');
    } catch (err: any) {
      if (err.code === 'auth/requires-recent-login') {
        setPasswordError('নিরাপত্তার কারণে পাসওয়ার্ড পরিবর্তন করতে আপনাকে আবার লগআউট করে লগইন করতে হবে।');
      } else {
        setPasswordError(err.message);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth);
  };

  const savePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresArray = pkgForm.features.split(',').map(f => f.trim()).filter(f => f);
    const pkgData = {
      title: pkgForm.title,
      price: pkgForm.price,
      features: featuresArray,
      description: pkgForm.description,
      highlight: pkgForm.highlight,
      isDaily: pkgForm.isDaily,
      createdAt: Date.now()
    };

    try {
      if (pkgForm.id) {
        await updateDoc(doc(db, 'packages', pkgForm.id), pkgData);
      } else {
        await addDoc(collection(db, 'packages'), pkgData);
      }
      setPkgForm({ id: '', title: '', price: '', features: '', description: '', highlight: false, isDaily: false });
    } catch (error) {
      handleFirestoreError(error, pkgForm.id ? OperationType.UPDATE : OperationType.CREATE, 'packages');
    }
  };

  const deletePackage = (id: string) => {
    setDeleteConfirm({ type: 'package', id });
  };

  const saveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    const imgData = {
      imageUrl: imgForm.imageUrl,
      title: imgForm.title,
      createdAt: Date.now()
    };

    try {
      if (imgForm.id) {
        await updateDoc(doc(db, 'gallery', imgForm.id), imgData);
      } else {
        await addDoc(collection(db, 'gallery'), imgData);
      }
      setImgForm({ id: '', imageUrl: '', title: '' });
    } catch (error) {
      handleFirestoreError(error, imgForm.id ? OperationType.UPDATE : OperationType.CREATE, 'gallery');
    }
  };

  const deleteImage = (id: string) => {
    setDeleteConfirm({ type: 'gallery', id });
  };

  const confirmDelete = async () => {
    if (!deleteConfirm) return;
    try {
      if (deleteConfirm.type === 'package') {
        await deleteDoc(doc(db, 'packages', deleteConfirm.id));
      } else {
        await deleteDoc(doc(db, 'gallery', deleteConfirm.id));
      }
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, deleteConfirm.type === 'package' ? 'packages' : 'gallery');
    }
    setDeleteConfirm(null);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          {loginError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{loginError}</div>}
          {loginMessage && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">{loginMessage}</div>}
          
          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full border rounded p-2 focus:ring-teal-500 focus:border-teal-500" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full border rounded p-2 focus:ring-teal-500 focus:border-teal-500" 
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={handleForgotPassword} className="text-sm text-teal-600 hover:text-teal-800">
                Forgot password?
              </button>
            </div>
            <button type="submit" className="w-full bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
              Login
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <button onClick={handleLogin} className="w-full border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google
          </button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="mb-4">You do not have permission to access the admin panel.</p>
          <button onClick={handleLogout} className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900">
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row pb-16 md:pb-0">
      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteConfirm(null)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded transition-colors">Cancel</button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded transition-colors">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-4 text-center font-bold sticky top-0 z-40 shadow-md">
        Admin Panel
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-gray-900 text-white flex-col fixed h-screen">
        <div className="p-4 text-xl font-bold border-b border-gray-800">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('packages')}
            className={`w-full flex items-center gap-2 p-2 rounded ${activeTab === 'packages' ? 'bg-teal-600' : 'hover:bg-gray-800'}`}
          >
            <PackageIcon size={20} /> Packages
          </button>
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`w-full flex items-center gap-2 p-2 rounded ${activeTab === 'gallery' ? 'bg-teal-600' : 'hover:bg-gray-800'}`}
          >
            <ImageIcon size={20} /> Gallery
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-2 p-2 rounded ${activeTab === 'settings' ? 'bg-teal-600' : 'hover:bg-gray-800'}`}
          >
            <Settings size={20} /> Settings
          </button>
        </nav>
        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center gap-2 p-2 rounded hover:bg-gray-800 text-red-400">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center p-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <button onClick={() => setActiveTab('packages')} className={`flex flex-col items-center p-2 w-1/4 ${activeTab === 'packages' ? 'text-teal-600' : 'text-gray-500'}`}>
          <PackageIcon size={20} />
          <span className="text-[10px] mt-1 font-medium">Packages</span>
        </button>
        <button onClick={() => setActiveTab('gallery')} className={`flex flex-col items-center p-2 w-1/4 ${activeTab === 'gallery' ? 'text-teal-600' : 'text-gray-500'}`}>
          <ImageIcon size={20} />
          <span className="text-[10px] mt-1 font-medium">Gallery</span>
        </button>
        <button onClick={() => setActiveTab('settings')} className={`flex flex-col items-center p-2 w-1/4 ${activeTab === 'settings' ? 'text-teal-600' : 'text-gray-500'}`}>
          <Settings size={20} />
          <span className="text-[10px] mt-1 font-medium">Settings</span>
        </button>
        <button onClick={handleLogout} className="flex flex-col items-center p-2 w-1/4 text-red-500">
          <LogOut size={20} />
          <span className="text-[10px] mt-1 font-medium">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 md:ml-64 overflow-y-auto">
        {activeTab === 'packages' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Packages</h2>
            
            {/* Form */}
            <form onSubmit={savePackage} className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4">{pkgForm.id ? 'Edit Package' : 'Add New Package'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input type="text" required value={pkgForm.title} onChange={e => setPkgForm({...pkgForm, title: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. ৪ সিট (ইকোনমি)" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                  <input type="text" required value={pkgForm.price} onChange={e => setPkgForm({...pkgForm, price: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. ৪,৬০০" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                  <input type="text" required value={pkgForm.features} onChange={e => setPkgForm({...pkgForm, features: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. ৩ বেলা খাবার, ফ্রি ওয়াইফাই" />
                </div>
                <div className="md:col-span-2 flex gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={pkgForm.highlight} onChange={e => setPkgForm({...pkgForm, highlight: e.target.checked})} />
                    <span className="text-sm font-medium text-gray-700">Highlight (জনপ্রিয়)</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={pkgForm.isDaily} onChange={e => setPkgForm({...pkgForm, isDaily: e.target.checked})} />
                    <span className="text-sm font-medium text-gray-700">Daily Package</span>
                  </label>
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                  {pkgForm.id ? 'Update Package' : 'Add Package'}
                </button>
                {pkgForm.id && (
                  <button type="button" onClick={() => setPkgForm({ id: '', title: '', price: '', features: '', description: '', highlight: false, isDaily: false })} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* List */}
            <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="p-4 font-medium text-gray-600">Title</th>
                    <th className="p-4 font-medium text-gray-600">Price</th>
                    <th className="p-4 font-medium text-gray-600">Features</th>
                    <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map(pkg => (
                    <tr key={pkg.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        {pkg.title}
                        {pkg.highlight && <span className="ml-2 text-xs bg-teal-100 text-teal-800 px-1 rounded">Highlight</span>}
                        {pkg.isDaily && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-1 rounded">Daily</span>}
                      </td>
                      <td className="p-4">৳{pkg.price}</td>
                      <td className="p-4 text-sm text-gray-500">{pkg.features?.join(', ')}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => setPkgForm({ id: pkg.id, title: pkg.title, price: pkg.price, features: pkg.features?.join(', ') || '', description: pkg.description || '', highlight: pkg.highlight || false, isDaily: pkg.isDaily || false })} className="text-blue-600 hover:text-blue-800 p-2">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => deletePackage(pkg.id)} className="text-red-600 hover:text-red-800 p-2">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {packages.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-gray-500">No packages found. Add one above.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>
            
            {/* Form */}
            <form onSubmit={saveImage} className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4">{imgForm.id ? 'Edit Image' : 'Add New Image'}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input type="url" required value={imgForm.imageUrl} onChange={e => setImgForm({...imgForm, imageUrl: e.target.value})} className="w-full border rounded p-2" placeholder="https://example.com/image.jpg" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title (Optional)</label>
                  <input type="text" value={imgForm.title} onChange={e => setImgForm({...imgForm, title: e.target.value})} className="w-full border rounded p-2" placeholder="e.g. Hostel Room" />
                </div>
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
                  {imgForm.id ? 'Update Image' : 'Add Image'}
                </button>
                {imgForm.id && (
                  <button type="button" onClick={() => setImgForm({ id: '', imageUrl: '', title: '' })} className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                    Cancel
                  </button>
                )}
              </div>
            </form>

            {/* List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map(img => (
                <div key={img.id} className="bg-white rounded-lg shadow-sm overflow-hidden border relative group">
                  <img src={img.imageUrl} alt={img.title || 'Gallery image'} className="w-full h-32 object-cover" />
                  <div className="p-2">
                    <p className="text-sm truncate">{img.title || 'Untitled'}</p>
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button onClick={() => setImgForm({ id: img.id, imageUrl: img.imageUrl, title: img.title || '' })} className="bg-white p-1.5 rounded shadow text-blue-600 hover:text-blue-800">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => deleteImage(img.id)} className="bg-white p-1.5 rounded shadow text-red-600 hover:text-red-800">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {gallery.length === 0 && (
                <div className="col-span-full py-8 text-center text-gray-500 bg-white rounded-lg border border-dashed">
                  No images found. Add one above.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm max-w-md">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Key size={20} /> Change Password
              </h3>
              
              {passwordError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{passwordError}</div>}
              {passwordMessage && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">{passwordMessage}</div>}
              
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input 
                    type="password" 
                    required 
                    minLength={6}
                    value={newPassword} 
                    onChange={e => setNewPassword(e.target.value)} 
                    className="w-full border rounded p-2 focus:ring-teal-500 focus:border-teal-500" 
                    placeholder="Enter new password"
                  />
                </div>
                <button type="submit" className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition-colors">
                  Update Password
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
