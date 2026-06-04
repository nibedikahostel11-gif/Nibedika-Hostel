import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail, updatePassword } from 'firebase/auth';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import { Trash2, Edit2, Plus, Image as ImageIcon, Package as PackageIcon, LogOut, Settings, Key, Upload, Loader2, CheckCircle2, Sparkles, Eye, Layers, Calendar, DollarSign, Check, X, Home, ArrowLeft } from 'lucide-react';

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

  // Package Management Helpers
  const [listFilter, setListFilter] = useState<'all' | 'monthly' | 'daily'>('all');

  const PRESET_FEATURES = [
    '৩ বেলা উন্নত পুষ্টিকর খাবার',
    'ফ্রি উচ্চগতির ওয়াইফাই (Wi-Fi)',
    '২৪ ঘণ্টা বিদ্যুৎ ও জেনারেটর ব্যাকআপ',
    '২৪/৭ সিসিটিভি ক্যামেরা ও নিরাপত্তা',
    'বিশুদ্ধ ফিল্টার করা খাবার পানি',
    'আধুনিক মনোরম টাইলসকৃত রুম',
    'এসি ও নন-এসি রুমের সুবিধা',
    'ফ্ল্যাট লিফট সুবিধা',
    'পড়াশোনার নিরিবিলি শান্ত পরিবেশ',
    'দৈনিক রুম ও বাথরুম পরিষ্কার করা'
  ];

  // Form states
  const [pkgForm, setPkgForm] = useState({ id: '', title: '', price: '', features: '', description: '', highlight: false, isDaily: false });
  const [imgForm, setImgForm] = useState({ id: '', imageUrl: '', title: '' });

  // Cloudinary Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // Auth states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [deleteConfirm, setDeleteConfirm] = useState<{type: 'package' | 'gallery', id: string} | null>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

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
    if (isLoggingIn) return;
    setIsLoggingIn(true);
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
    } finally {
      setIsLoggingIn(false);
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
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    signOut(auth);
    setShowLogoutConfirm(false);
  };

  const togglePresetFeature = (featureName: string) => {
    const currentFeatures = pkgForm.features
      .split(',')
      .map(f => f.trim())
      .filter(f => f !== '');
    
    const index = currentFeatures.indexOf(featureName);
    if (index > -1) {
      currentFeatures.splice(index, 1);
    } else {
      currentFeatures.push(featureName);
    }
    
    setPkgForm(prev => ({
      ...prev,
      features: currentFeatures.join(', ')
    }));
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

  const handleImageUpload = async (file: File) => {
    setIsUploading(true);
    setUploadError('');
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'dvo6tkkzp123');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dvo6tkkzp/image/upload', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Cloudinary upload failed');
      }
      const data = await response.json();
      if (data.secure_url) {
        setImgForm(prev => ({ ...prev, imageUrl: data.secure_url }));
      } else {
        throw new Error('No secure URL returned from Cloudinary');
      }
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      setUploadError('ছবি আপলোড করতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।');
    } finally {
      setIsUploading(false);
    }
  };

  const saveImage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format Google Drive URLs to direct image URLs
    let formattedUrl = imgForm.imageUrl;
    if (formattedUrl.includes('drive.google.com')) {
      const fileMatch = formattedUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      const idMatch = formattedUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/);
      
      if (fileMatch && fileMatch[1]) {
        formattedUrl = `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;
      } else if (idMatch && idMatch[1]) {
        formattedUrl = `https://lh3.googleusercontent.com/d/${idMatch[1]}`;
      }
    }

    const imgData = {
      imageUrl: formattedUrl,
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
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
          <Link 
            to="/" 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-100 flex items-center justify-center"
            title="Cancel"
          >
            <X size={20} />
          </Link>
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          
          {loginError && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{loginError}</div>}
          {loginMessage && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">{loginMessage}</div>}
          
          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                id="admin-email"
                name="email"
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all duration-150 font-medium" 
                placeholder="ইমেইল এড্রেস লিখুন"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEmailLogin(e);
                  }
                }}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                id="admin-password"
                name="password"
                type="password" 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all duration-150 font-medium" 
                placeholder="পাসওয়ার্ড লিখুন"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleEmailLogin(e);
                  }
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={handleForgotPassword} className="text-sm font-semibold text-teal-600 hover:text-teal-800 transition-colors">
                পাসওয়ার্ড ভুলে গেছেন? (Forgot password?)
              </button>
            </div>
            <button 
              type="submit" 
              disabled={isLoggingIn}
              className="w-full bg-teal-600 text-white px-4 py-3 rounded-xl hover:bg-teal-700 active:scale-[0.97] active:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500/50 transition-all duration-150 transform flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100 font-bold text-sm tracking-wide shadow-md shadow-teal-600/10"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  লগইন হচ্ছে... (Logging in...)
                </>
              ) : (
                <>
                  লগইন করুন (Login)
                </>
              )}
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
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full relative">
          <Link 
            to="/" 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-full hover:bg-gray-100 flex items-center justify-center"
            title="Cancel"
          >
            <X size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="mb-4">You do not have permission to access the admin panel.</p>
          <div className="flex gap-2 justify-center">
            <button onClick={handleLogout} className="bg-gray-800 text-white px-6 py-2 rounded hover:bg-gray-900 transition-colors">
              Logout
            </button>
            <Link to="/" className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition-colors flex items-center gap-1.5 font-medium">
              <Home size={16} /> Home
            </Link>
          </div>
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

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl border border-gray-100/50 transform transition-all scale-100">
            <div className="flex items-center gap-3 text-red-500 mb-2">
              <div className="p-2 bg-red-50 rounded-lg text-red-500">
                <LogOut size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-sans">লগআউট নিশ্চিতকরণ</h3>
            </div>
            <p className="text-sm text-gray-500 mb-6 leading-relaxed">
              আপনি কি নিশ্চিতভাবে আপনার এডমিন প্যানেল সেশন থেকে লগআউট করতে চান?
            </p>
            <div className="flex justify-end gap-2 px-1">
              <button 
                type="button"
                onClick={() => setShowLogoutConfirm(false)} 
                className="px-4 py-2.5 text-xs md:text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all"
              >
                বাতিল (Cancel)
              </button>
              <button 
                type="button"
                onClick={confirmLogout} 
                className="px-4 py-2.5 text-xs md:text-sm font-bold text-white bg-red-600 hover:bg-red-700 rounded-xl shadow-md shadow-red-600/10 transition-all"
              >
                নিশ্চিত লগআউট (Logout)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Header */}
      <div className="md:hidden bg-gray-900 text-white p-3 flex items-center justify-between sticky top-0 z-40 shadow-md">
        <span className="font-bold">Admin Panel</span>
        <Link 
          to="/" 
          className="flex items-center gap-1 text-[11px] bg-teal-600 hover:bg-teal-700 text-white px-2.5 py-1.5 rounded-lg transition-colors font-semibold"
        >
          <Home size={12} /> হোমে ফিরুন (Main Site)
        </Link>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 bg-gray-900 text-white flex-col fixed h-screen">
        <div className="p-4 text-xl font-bold border-b border-gray-800 flex items-center justify-between">
          <span>Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            to="/" 
            className="w-full flex items-center gap-2 p-2 rounded bg-gray-800 hover:bg-gray-700 text-teal-400 hover:text-teal-300 transition-colors font-medium border border-teal-500/10 mb-4"
          >
            <Home size={18} /> হোমে ফিরে যান (Back to Site)
          </Link>
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
          <div className="space-y-8 animate-fade-in font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-5">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">প্যাকেজ ব্যবস্থাপনা (Manage Packages)</h2>
                <p className="text-sm text-gray-500 mt-1">হোস্টেলের আসন ও বিভিন্ন মেয়াদের প্যাকেজ পরিবর্তন ও পরিচালনা করুন।</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs bg-teal-100 text-teal-800 font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Layers size={12} />
                  মোট প্যাকেজ: {packages.length} টি
                </span>
              </div>
            </div>

            {/* Main Interactive Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Awesome Dynamic Form */}
              <div className="lg:col-span-7 space-y-6">
                <form onSubmit={savePackage} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-500 to-emerald-500"></div>
                  
                  <div className="flex items-center gap-2 mb-6 border-b pb-3">
                    <div className="p-2 h-9 w-9 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
                      {pkgForm.id ? <Edit2 size={18} /> : <Plus size={18} />}
                    </div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {pkgForm.id ? 'প্যাকেজ পরিবর্তন করুন (Edit Package)' : 'নতুন প্যাকেজ যুক্ত করুন (Add New Package)'}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {/* Title & Price */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">প্যাকেজের নাম (Package Title) *</label>
                        <input 
                          type="text" 
                          required 
                          value={pkgForm.title} 
                          onChange={e => setPkgForm({...pkgForm, title: e.target.value})} 
                          className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium placeholder-gray-400" 
                          placeholder="যেমনঃ ৪ সিট (ইকোনমি) বা ৩ সিটের রুম" 
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">ভাড়া / খরচ (Price BDT) *</label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-3.5 text-gray-400 font-semibold text-sm">৳</span>
                          <input 
                            type="text" 
                            required 
                            value={pkgForm.price} 
                            onChange={e => setPkgForm({...pkgForm, price: e.target.value})} 
                            className="w-full border border-gray-200 rounded-xl py-3 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-semibold placeholder-gray-400" 
                            placeholder="যেমনঃ ৪,৬০০ বা ৩৫০" 
                          />
                        </div>
                      </div>
                    </div>

                    {/* Short Description */}
                    <div>
                      <div className="flex justify-between items-center mb-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">সংক্ষিপ্ত বিবরণ (Short Description)</label>
                        <span className="text-[10px] text-gray-400">ঐচ্ছিক (Optional)</span>
                      </div>
                      <textarea
                        value={pkgForm.description}
                        onChange={e => setPkgForm({...pkgForm, description: e.target.value})}
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder-gray-400 resize-none h-16"
                        placeholder="যেমনঃ অ্যাটাচড বাথ এবং সুন্দর বেলকনি সহ আধুনিক কক্ষ।"
                      />
                    </div>

                    {/* Features field */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                        সুবিধাসমূহ কমা (,) দিয়ে আলাদা করুন (Features List) *
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={pkgForm.features} 
                        onChange={e => setPkgForm({...pkgForm, features: e.target.value})} 
                        className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all placeholder-gray-400" 
                        placeholder="যেমনঃ ৩ বেলা খাবার, ফ্রি ওয়াইফাই, বিদ্যুৎ ব্যাকআপ" 
                      />
                    </div>

                    {/* PRESET FEATURES TOOL */}
                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <p className="text-xs font-semibold text-gray-600 mb-3 flex items-center gap-1">
                        <Sparkles size={14} className="text-teal-600" />
                        सहজে ও দ্রুত সুবিধা সিলেক্ট করুন (Quick Click Presets):
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {PRESET_FEATURES.map((feat, idx) => {
                          const isSelected = pkgForm.features
                            .split(',')
                            .map(f => f.trim())
                            .includes(feat);
                          return (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => togglePresetFeature(feat)}
                              className={`text-xs px-3 py-1.5 rounded-full border transition-all duration-150 flex items-center gap-1 font-medium ${
                                isSelected
                                  ? 'bg-teal-600 border-teal-600 text-white shadow-sm'
                                  : 'bg-white border-gray-200 text-gray-600 hover:border-teal-400 hover:bg-teal-50/20'
                              }`}
                            >
                              {isSelected && <Check size={12} />}
                              {feat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Segmented Package Type Option */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">প্যাকেজের ধরণ (Billing Cycle)</label>
                        <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-50">
                          <button
                            type="button"
                            onClick={() => setPkgForm({...pkgForm, isDaily: false})}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                              !pkgForm.isDaily 
                                ? 'bg-white text-teal-700 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            <Calendar size={13} /> মাসিক (Monthly)
                          </button>
                          <button
                            type="button"
                            onClick={() => setPkgForm({...pkgForm, isDaily: true})}
                            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                              pkgForm.isDaily 
                                ? 'bg-white text-teal-700 shadow-sm' 
                                : 'text-gray-500 hover:text-gray-800'
                            }`}
                          >
                            <Sparkles size={13} /> দৈনিক (Daily)
                          </button>
                        </div>
                      </div>

                      {/* Highlight Banner Checkbox */}
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">জনপ্রিয় ট্যাগ (Promotional Badge)</label>
                        <button
                          type="button"
                          onClick={() => setPkgForm({...pkgForm, highlight: !pkgForm.highlight})}
                          className={`w-full py-2.5 px-4 rounded-xl border text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 ${
                            pkgForm.highlight 
                              ? 'border-amber-300 bg-amber-50 text-amber-800 ring-2 ring-amber-300/20' 
                              : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <Sparkles size={14} className={pkgForm.highlight ? 'text-amber-500 fill-amber-500' : ''} />
                          {pkgForm.highlight ? 'জনপ্রিয় হিসেবে চিহ্নিত (Recommended: Yes)' : 'সাধারণ অফার হিসেবে দেখান (Recommended: No)'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex gap-2.5 mt-8 border-t pt-5">
                    <button 
                      type="submit" 
                      className="flex-1 bg-teal-600 text-white px-5 py-3 rounded-xl hover:bg-teal-700 transition-all font-bold text-sm tracking-wide shadow-md shadow-teal-600/10 flex items-center justify-center gap-2"
                    >
                      {pkgForm.id ? 'প্যাকেজ আপডেট করুন (Update Details)' : 'প্যাকেজ সংরক্ষণ করুন (Create Package)'}
                    </button>
                    {pkgForm.id && (
                      <button 
                        type="button" 
                        onClick={() => setPkgForm({ id: '', title: '', price: '', features: '', description: '', highlight: false, isDaily: false })} 
                        className="bg-gray-100 text-gray-700 px-5 py-3 rounded-xl hover:bg-gray-200 transition-all font-bold text-sm"
                      >
                        বাতিল (Cancel)
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: Dynamic Realtime Live Preview */}
              <div className="lg:col-span-5 lg:sticky lg:top-8">
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 shadow-inner">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
                      <Eye size={13} />
                      লাইভ প্রিভিউ (Real-time Card Preview)
                    </h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold animate-pulse">
                      সরাসরি আপডেট হচ্ছে
                    </span>
                  </div>

                  {/* Beautiful Card Component */}
                  <div className="bg-white rounded-2xl shadow-lg border border-teal-100/50 overflow-hidden relative transition-all duration-300 transform hover:scale-[1.01]">
                    <div className="bg-gradient-to-br from-teal-600 to-emerald-600 p-6 text-white text-center relative overflow-hidden">
                      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                      <div className="absolute -left-6 -top-6 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
                      
                      {pkgForm.highlight && (
                        <span className="absolute top-3 right-3 bg-amber-400 text-gray-950 font-sans font-bold text-[10px] tracking-wide uppercase px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
                          ★ POPULAR
                        </span>
                      )}
                      
                      <p className="text-teal-100 text-[10px] md:text-xs font-bold tracking-wider uppercase mb-1">
                        {pkgForm.isDaily ? '☀️ SHORT TERM / DAILY' : '📅 MONTHLY PACKAGE'}
                      </p>
                      <h4 className="text-lg md:text-xl font-bold font-sans">
                        {pkgForm.title || '(প্যাকেজের শিরোনাম)'}
                      </h4>
                    </div>

                    <div className="p-6 space-y-5">
                      <div className="text-center">
                        <span className="text-xs text-gray-400 font-semibold mr-1">BDT</span>
                        <span className="text-4xl font-black text-gray-900 font-sans tracking-tight">
                          {pkgForm.price || '0'}
                        </span>
                        <span className="text-xs text-gray-400 font-semibold"> 
                          {pkgForm.isDaily ? '/ দিন' : '/ মাস'}
                        </span>
                      </div>
                      
                      {pkgForm.description && (
                        <p className="text-xs text-gray-500 border-b pb-3 mb-3 text-center italic leading-relaxed">
                          {pkgForm.description}
                        </p>
                      )}

                      <div className="space-y-2.5 min-h-[100px] flex flex-col justify-start">
                        {pkgForm.features ? (
                          pkgForm.features.split(',').map(f => f.trim()).filter(f => f).map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs md:text-sm text-gray-700">
                              <CheckCircle2 size={15} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                              <span className="font-medium text-gray-600">{feature}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-6 text-gray-300 text-xs italic">
                            কোনো সুবিধা যুক্ত করা হয়নি
                          </div>
                        )}
                      </div>

                      <button type="button" className="w-full bg-teal-600/95 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-1.5 text-xs tracking-wider cursor-not-allowed uppercase">
                        বুকিং করুন (WhatsApp)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* List Header and Filter Toggle */}
            <div className="mt-12 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">বিদ্যমান প্যাকেজসমূহ (Active Packages)</h3>
                  <p className="text-xs text-gray-500 mt-0.5">আপনার হোস্টেলের সমস্ত সক্রিয় ক্যাটাগরি ও প্যাকেজের তালিকা।</p>
                </div>

                {/* Listing Filter Slider */}
                <div className="flex border border-gray-200 rounded-xl p-1 bg-gray-50 text-xs font-semibold self-start md:self-auto">
                  <button 
                    onClick={() => setListFilter('all')} 
                    className={`px-3.5 py-2 rounded-lg transition-all ${listFilter === 'all' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    সব প্যাকেজ ({packages.length})
                  </button>
                  <button 
                    onClick={() => setListFilter('monthly')} 
                    className={`px-3.5 py-2 rounded-lg transition-all ${listFilter === 'monthly' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    মাসিক ({packages.filter(p => !p.isDaily).length})
                  </button>
                  <button 
                    onClick={() => setListFilter('daily')} 
                    className={`px-3.5 py-2 rounded-lg transition-all ${listFilter === 'daily' ? 'bg-teal-600 text-white shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                  >
                    দৈনিক ({packages.filter(p => p.isDaily).length})
                  </button>
                </div>
              </div>

              {/* Grid-based Beautiful Package Cards for Management */}
              {packages.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed rounded-2xl bg-gray-50 border-gray-200">
                  <PackageIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-500">এখনো কোনো প্যাকেজ তৈরি করা হয়নি।</p>
                  <p className="text-xs text-gray-400 mt-1">প্যাকেজ যোগ করতে উপরের ফর্মটি ব্যবহার করুন।</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {packages
                    .filter(pkg => {
                      if (listFilter === 'monthly') return !pkg.isDaily;
                      if (listFilter === 'daily') return pkg.isDaily;
                      return true;
                    })
                    .map(pkg => (
                      <div 
                        key={pkg.id} 
                        className={`border rounded-2xl p-5 transition-all duration-200 hover:shadow-md flex flex-col justify-between relative overflow-hidden bg-white ${
                          pkg.highlight 
                            ? 'border-amber-300 bg-amber-50/5 ring-1 ring-amber-300/10' 
                            : 'border-gray-100 hover:border-gray-200'
                        }`}
                      >
                        {/* Highlighting strip on packages */}
                        {pkg.highlight && (
                          <div className="absolute top-0 right-0 left-0 h-1 bg-amber-400"></div>
                        )}

                        <div>
                          {/* Card tags */}
                          <div className="flex items-center justify-between mb-3.5">
                            <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full tracking-wider uppercase ${
                              pkg.isDaily ? 'bg-yellow-105 text-yellow-800 bg-yellow-100' : 'bg-teal-100 text-teal-800'
                            }`}>
                              {pkg.isDaily ? '☀️ Daily (দৈনিক)' : '📅 Monthly (মাসিক)'}
                            </span>
                            
                            {pkg.highlight && (
                              <span className="text-[10px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                                ★ POPULAR
                              </span>
                            )}
                          </div>

                          {/* Info */}
                          <h4 className="font-bold text-gray-800 text-base mb-1 font-sans">{pkg.title}</h4>
                          <div className="flex items-baseline gap-1 mb-3">
                            <span className="text-lg font-black text-gray-950 font-sans">৳{pkg.price}</span>
                            <span className="text-gray-400 text-xs">{pkg.isDaily ? '/ দিন' : '/ মাস'}</span>
                          </div>

                          {pkg.description && (
                            <p className="text-xs text-gray-500 line-clamp-2 mb-3.5 bg-gray-50 p-2 rounded-lg font-sans">
                              {pkg.description}
                            </p>
                          )}

                          {/* Features list */}
                          <div className="space-y-2 mb-5 font-sans">
                            {pkg.features?.slice(0, 4).map((feature: string, index: number) => (
                              <div key={index} className="flex items-center gap-1.5 text-xs text-gray-600">
                                <Check size={13} className="text-emerald-500 flex-shrink-0" />
                                <span className="truncate">{feature}</span>
                              </div>
                            ))}
                            {pkg.features && pkg.features.length > 4 && (
                              <p className="text-[10px] text-gray-400 italic pl-4">+ আরো {pkg.features.length - 4} টি সুবিধা রয়েছে...</p>
                            )}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div className="border-t border-gray-100/70 pt-3.5 flex items-center justify-between mt-auto">
                          <span className="text-[10px] text-gray-400 font-mono">ID: {pkg.id.slice(0, 6)}</span>
                          <div className="flex gap-1">
                            <button 
                              onClick={() => setPkgForm({ 
                                id: pkg.id, 
                                title: pkg.title, 
                                price: pkg.price, 
                                features: pkg.features?.join(', ') || '', 
                                description: pkg.description || '', 
                                highlight: pkg.highlight || false, 
                                isDaily: pkg.isDaily || false 
                              })} 
                              className="p-2 text-teal-600 hover:bg-teal-50 rounded-xl transition-colors"
                              title="পরিবর্তন করুন"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button 
                              onClick={() => deletePackage(pkg.id)} 
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                              title="মুছে ফেলুন"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Manage Gallery</h2>
            
            {/* Form */}
            <form onSubmit={saveImage} className="bg-white p-6 rounded-lg shadow-sm mb-8">
              <h3 className="text-lg font-semibold mb-4">{imgForm.id ? 'Edit Image (ছবি পরিবর্তন করুন)' : 'Add New Image (নতুন ছবি যুক্ত করুন)'}</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                {/* Image Upload Area */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5 font-sans">ছবি আপলোড করুন (Upload Image)</label>
                  
                  <div
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setIsDragging(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) handleImageUpload(file);
                    }}
                    onClick={() => {
                      const fileInput = document.getElementById('cloudinary-file-upload');
                      if (fileInput) fileInput.click();
                    }}
                    className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all duration-200 group ${
                      isDragging 
                        ? 'border-teal-500 bg-teal-50/50' 
                        : 'border-gray-300 hover:border-teal-500 hover:bg-gray-50'
                    }`}
                  >
                    <input 
                      type="file" 
                      id="cloudinary-file-upload" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                      }} 
                    />
                    
                    {isUploading ? (
                      <div className="flex flex-col items-center gap-2 py-4">
                        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                        <span className="text-sm font-medium text-gray-600">ছবি আপলোড হচ্ছে...</span>
                      </div>
                    ) : imgForm.imageUrl ? (
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative group/preview">
                          <img 
                            src={imgForm.imageUrl} 
                            alt="Preview" 
                            className="max-h-40 rounded-lg object-contain border bg-gray-50" 
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/60 text-white text-[11px] text-center py-1 opacity-0 group-hover/preview:opacity-100 transition-opacity rounded-b-lg">
                            নতুন ছবি ড্রপ বা ক্লিক করুন পরিবর্তন করতে
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 font-mono break-all">{imgForm.imageUrl}</span>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2 group-hover:text-teal-500 transition-colors" />
                        <p className="text-sm font-medium text-gray-700">ছবি এখানে ড্র্যাগ করুন অথবা ক্লিক করে ফাইল সিলেক্ট করুন</p>
                        <p className="text-xs text-gray-400 mt-1">PNG, JPG, JPEG (সর্বোচ্চ ১০ এমবি)</p>
                      </div>
                    )}
                  </div>
                  
                  {uploadError && (
                    <p className="text-sm text-red-600 mt-2 font-medium">{uploadError}</p>
                  )}
                </div>

                {/* URL Input (Alternative/Optional fall-back) */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <label className="block text-sm font-medium text-gray-700 font-sans">অথবা ছবির লিংক দিন (Image URL)</label>
                    <span className="text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">ঐচ্ছিক / Optional</span>
                  </div>
                  <input 
                    type="url" 
                    value={imgForm.imageUrl} 
                    onChange={e => setImgForm({...imgForm, imageUrl: e.target.value})} 
                    className="w-full border rounded p-2 text-sm" 
                    placeholder="https://example.com/image.jpg" 
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 font-sans">শিরোনাম (Title - Optional)</label>
                  <input 
                    type="text" 
                    value={imgForm.title} 
                    onChange={e => setImgForm({...imgForm, title: e.target.value})} 
                    className="w-full border rounded p-2 text-sm" 
                    placeholder="যেমনঃ হোস্টেল কামরা" 
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <button 
                  type="submit" 
                  disabled={isUploading || !imgForm.imageUrl}
                  className={`bg-teal-600 text-white px-5 py-2.5 rounded hover:bg-teal-700 transition-colors font-medium flex items-center gap-1.5 ${
                    (isUploading || !imgForm.imageUrl) ? 'opacity-50 cursor-not-allowed bg-teal-500' : ''
                  }`}
                >
                  {imgForm.id ? 'আপডেট করুন (Update)' : 'সংরক্ষণ করুন (Save Image)'}
                </button>
                {imgForm.id && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setImgForm({ id: '', imageUrl: '', title: '' });
                      setUploadError('');
                    }} 
                    className="bg-gray-200 text-gray-800 px-5 py-2.5 rounded hover:bg-gray-300 transition-colors font-medium"
                  >
                    বাতিল (Cancel)
                  </button>
                )}
              </div>
            </form>

            {/* List */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map(img => (
                <div key={img.id} className="bg-white rounded-lg shadow-sm overflow-hidden border relative group">
                  <img src={img.imageUrl} alt={img.title || 'Gallery image'} className="w-full h-32 object-cover" referrerPolicy="no-referrer" />
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
