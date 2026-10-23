import { useState } from 'react';
import { 
  Heart, MessageCircle, Bookmark, Share2, Plus, Search, Filter, MapPin, 
  Phone, Star, ShieldCheck, CheckCircle2, User, Bell, ChevronLeft, X, 
  Send, Sparkles, Calendar, Clock, ExternalLink, Users, PlusCircle, 
  Edit3, Trash2, Check, AlertCircle, Eye, Info, Lock, LogOut, SlidersHorizontal,
  Navigation, Building, Compass, Layers, MessageSquare, ArrowRight, CornerDownRight
} from 'lucide-react';

const THEME = {
  primary: '#F4B8C8',
  secondary: '#F9DCE4',
  background: '#FFF9F5',
  card: '#FFFFFF',
  accent: '#C76F8A',
  textMain: '#493B40',
  textMuted: '#897A80',
  border: '#F0E1E6',
  success: '#8BAE91',
};

// Spreadsheet Data Representation (Safe place for disabled kids dataset)
const INITIAL_PLACES = [
  {
    id: 'p1',
    name: 'National Science Centre (Pusat Sains Negara)',
    address: 'Persiaran Bukit Kiara, Bukit Damansara, 50490 Kuala Lumpur',
    contact: '+603-2089 3400',
    rating: 4.6,
    description: 'Interactive science museum with dedicated sensory play zones, wide ramps throughout, accessible restrooms, and calm morning visiting hours for neurodivergent children.',
    category: 'Sensory-Friendly Spaces',
    accessibilityFeatures: ['Wheelchair ramp', 'Sensory play zone', 'Accessible toilets', 'Quiet rest areas', 'Wide pathways'],
    verificationStatus: 'Verified',
    reviewCount: 28,
    sampleReview: 'Extremely welcoming staff! The sensory room on the 2nd floor was a lifesaver when my autistic son needed a break from crowds.'
  },
  {
    id: 'p2',
    name: 'Farm In The City',
    address: 'Lot 40187-40188, Jalan Prima Tropika Barat 1, Bandar Putra Permai, 43300 Seri Kembangan, Selangor',
    contact: '+603-8941 2099',
    rating: 4.7,
    description: 'Petting zoo with barrier-free wide pathways, gentle animal interaction zones, tactile learning opportunities, and wheelchair accessible paths across the park.',
    category: 'Family Entertainment',
    accessibilityFeatures: ['Wheelchair ramp', 'Sensory play zone', 'Accessible toilets', 'Wide pathways', 'Tactile guides'],
    verificationStatus: 'Verified',
    reviewCount: 42,
    sampleReview: 'Pathways are smooth for wheelchairs. Staff were quick to assist with stroller ramps and animal feeding spots.'
  },
  {
    id: 'p3',
    name: 'Sunway Pyramid Sensory Room (Calm Room)',
    address: '3, Jalan PJS 11/15, Bandar Sunway, 47500 Subang Jaya, Selangor',
    contact: '+603-7494 3100',
    rating: 4.8,
    description: 'Malaysia’s first autism-friendly shopping mall equipped with a dedicated Calm Room, sensory wall maps, and Autome Monday sensory-friendly shopping hours.',
    category: 'Sensory-Friendly Spaces',
    accessibilityFeatures: ['Sensory play zone', 'Quiet rest areas', 'Accessible toilets', 'Sensory-friendly environment'],
    verificationStatus: 'Verified',
    reviewCount: 56,
    sampleReview: 'We registered for the Calm Room access card. Clean, quiet, soft lighting—perfect for managing sensory overload.'
  },
  {
    id: 'p4',
    name: 'Taman Botani Negara Shah Alam',
    address: '40000 Shah Alam, Selangor',
    contact: '+603-5510 6862',
    rating: 4.3,
    description: 'Expansive botanical garden featuring paved sensory flora trails, open green lawns, accessible shuttle buggies upon request, and peaceful rest gazebos.',
    category: 'Parks and Playgrounds',
    accessibilityFeatures: ['Wheelchair ramp', 'Wide pathways', 'Quiet rest areas', 'Accessible toilets'],
    verificationStatus: 'Listed',
    reviewCount: 19,
    sampleReview: 'Very soothing natural environment. Renting an electric tram option made it smooth for our family.'
  },
  {
    id: 'p5',
    name: 'IDEAS Autism Centre & Early Intervention',
    address: 'No. 1 & 3, Jalan TSB 8, Taman Industri Sungai Buloh, 47000 Sungai Buloh, Selangor',
    contact: '+603-6156 3001',
    rating: 4.9,
    description: 'Specialized therapy and early intervention centre with sensory integration rooms, speech therapy, and 1-on-1 developmental support facilities.',
    category: 'Therapy Centres',
    accessibilityFeatures: ['Therapy services', 'Sensory play zone', 'Learning support', 'Accessible toilets'],
    verificationStatus: 'Verified',
    reviewCount: 31,
    sampleReview: 'Dedicated therapists and clean structured play spaces tailored for early childhood developmental therapy.'
  },
  {
    id: 'p6',
    name: 'Raja Tun Uda Library (Sensory & Children Section)',
    address: 'Jalan Klub Golf 13/6, Seksyen 13, 40100 Shah Alam, Selangor',
    contact: '+603-5519 7667',
    rating: 4.7,
    description: 'State library equipped with 3D creative theater, comfortable padded reading nooks, elevator access, ramped entrances, and specialized learning toys.',
    category: 'Learning Centres',
    accessibilityFeatures: ['Wheelchair ramp', 'Quiet rest areas', 'Learning support', 'Accessible toilets', 'Wide pathways'],
    verificationStatus: 'Verified',
    reviewCount: 24,
    sampleReview: 'The children’s section is carpeted, quiet, and very spacious for wheelchairs and floor play.'
  },
  {
    id: 'p7',
    name: 'Taman Recreasi Inclusive Park Permaisuri',
    address: 'Jalan Permaisuri 3, Bandar Tun Razak, 56000 Kuala Lumpur',
    contact: 'Information unavailable',
    rating: 4.4,
    description: 'Public park with inclusive sensory playground equipment, handicap swing seats, smooth rubberized flooring, and ramped access.',
    category: 'Parks and Playgrounds',
    accessibilityFeatures: ['Wheelchair ramp', 'Sensory play zone', 'Wide pathways', 'Wheelchair-friendly access'],
    verificationStatus: 'Needs verification',
    reviewCount: 11,
    sampleReview: 'Wheelchair swings are great, though maintenance on some sensory boards needs updating.'
  },
  {
    id: 'p8',
    name: 'Spastic Children’s Association of Selangor & KL (SCASFT)',
    address: '14, Jalan 14/1, Section 14, 46100 Petaling Jaya, Selangor',
    contact: '+603-7958 2399',
    rating: 4.8,
    description: 'Comprehensive rehabilitation facility offering hydrotherapy, occupational therapy, physio support, and adaptive sport facilities.',
    category: 'Rehabilitation Centres',
    accessibilityFeatures: ['Therapy services', 'Consultation services', 'Wheelchair ramp', 'Accessible toilets', 'Wide pathways'],
    verificationStatus: 'Verified',
    reviewCount: 38,
    sampleReview: 'Wonderful hydrotherapy pool and compassionate professional rehabilitation specialists.'
  }
];

const INITIAL_POSTS = [
  {
    id: 'post1',
    author: 'Aishah Rahman',
    location: 'Shah Alam, Selangor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    time: '2 hours ago',
    content: 'Celebrated Adam’s 7th birthday at Sunway Calm Room today! Huge milestone—he was able to enjoy the mall without getting overwhelmed by loud music for the first time. Grateful for places taking sensory needs seriously! 💖',
    image: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600',
    likes: 24,
    liked: false,
    saved: false,
    comments: [
      { id: 'c1', author: 'Siti Sarah', text: 'So happy for Adam! Did you have to book the Calm Room in advance?', time: '1 hour ago' },
      { id: 'c2', author: 'Aishah Rahman', text: '@Siti Sarah No, just show your OKU card or register at the concierge desk!', time: '45 mins ago' }
    ]
  },
  {
    id: 'post2',
    author: 'Dr. Ramesh Kumar',
    location: 'Petaling Jaya, Selangor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
    time: '5 hours ago',
    content: 'Looking for advice on inclusive primary schools near Subang/PJ area with good learning support assistants (LSAs) for children with mild ADHD and speech delays. Would love recommendations from other parents!',
    image: null,
    likes: 18,
    liked: true,
    saved: true,
    comments: [
      { id: 'c3', author: 'Mei Ling', text: 'Sent you a DM! SK Inclusive Subang has a great PPKI coordinator.', time: '3 hours ago' }
    ]
  },
  {
    id: 'post3',
    author: 'Noraini Zulkifli',
    location: 'Klang, Selangor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
    time: '1 day ago',
    content: 'Sharing a small win: My daughter tried sensory sand art at Raja Tun Uda Library today without wearing noise-canceling headphones. Step by step! 🎨✨',
    image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=600',
    likes: 45,
    liked: false,
    saved: false,
    comments: []
  }
];

const INITIAL_EVENTS = [
  {
    id: 'e1',
    title: 'Sensory Friendly Art & Clay Workshop',
    venue: 'National Science Centre, Bukit Damansara',
    address: 'Persiaran Bukit Kiara, Bukit Damansara, KL',
    date: '2026-11-15',
    time: '10:00 AM - 12:30 PM',
    organizer: 'Autism Family Support Network',
    organizerType: 'NGO',
    fee: 'Free',
    feeAmount: '0',
    category: 'Autism and Special Needs Activities',
    description: 'A quiet, tactile art session designed for children on the autism spectrum and sensory processing needs. Materials provided with low lighting and quiet zones.',
    eligibility: 'Children aged 5-14 with OKU card or special needs & family',
    contact: '+6012-3456789',
    registrationUrl: 'https://example.org/register/sensory-art',
    saved: false,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'e2',
    title: 'Inclusive Hydrotherapy & Water Play Day',
    venue: 'SCASFT Rehabilitation Center, Petaling Jaya',
    address: '14, Jalan 14/1, Section 14, PJ',
    date: '2026-11-22',
    time: '09:00 AM - 12:00 PM',
    organizer: 'Selangor OKU Youth Club',
    organizerType: 'Public Organizer',
    fee: 'Paid',
    feeAmount: 'RM 15',
    category: 'Therapy and Development',
    description: 'Guided water therapy and splash play managed by certified occupational therapists. Hoist facilities and ramped pool entry available.',
    eligibility: 'Open to children with physical disabilities and motor delays',
    contact: '+6018-9876543',
    registrationUrl: 'https://example.org/register/hydro-day',
    saved: true,
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'e3',
    title: 'Parent Wellness & Special Needs Caregiver Talk',
    venue: 'Raja Tun Uda Library Auditorium',
    address: 'Jalan Klub Golf 13/6, Seksyen 13, Shah Alam',
    date: '2026-12-05',
    time: '02:00 PM - 04:30 PM',
    organizer: 'Mesra Community Circle',
    organizerType: 'Parent',
    fee: 'Free',
    feeAmount: '0',
    category: 'Parent Support Groups',
    description: 'An open dialogue on avoiding burnout, navigating education rights, and mental well-being for parents of children with OKU needs.',
    eligibility: 'Parents, guardians, and educators',
    contact: '+6011-22334455',
    registrationUrl: '',
    saved: false,
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600'
  }
];

const INITIAL_COMMUNITIES = [
  {
    id: 'c1',
    name: 'Autism Parents Malaysia',
    description: 'A warm, supportive circle for parents navigating autism therapies, school transitions, and daily tips across Malaysia.',
    category: 'Autism & Neurodiversity',
    members: 1420,
    joined: true,
    cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
    rules: ['Be respectful and compassionate.', 'No unverified medical claims.', 'Protect children’s privacy.']
  },
  {
    id: 'c2',
    name: 'Down Syndrome Support Circle',
    description: 'Connecting families with Down syndrome children for social playdates, early intervention sharing, and medical guidance.',
    category: 'Developmental Support',
    members: 890,
    joined: false,
    cover: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&q=80&w=600',
    rules: ['Supportive atmosphere.', 'Keep recommendations practical.', 'Respect confidentiality.']
  },
  {
    id: 'c3',
    name: 'Inclusive Play & Sports Selangor',
    description: 'Organizing sensory-friendly outdoor sports, playground park meetups, and swimming outings in Selangor.',
    category: 'Recreation & Sports',
    members: 610,
    joined: true,
    cover: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600',
    rules: ['All disability categories welcome.', 'Parents must supervise during sports.']
  },
  {
    id: 'c4',
    name: 'Special Education (PPKI) Network',
    description: 'Discussions on government PPKI programs, IEP planning, and transition to vocational learning.',
    category: 'Education',
    members: 1105,
    joined: false,
    cover: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600',
    rules: ['Constructive advice only.', 'Share verified school resources.']
  }
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 'n1',
    type: 'like',
    user: 'Siti Sarah',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150',
    message: 'liked your post about Sunway Calm Room.',
    time: '15 mins ago',
    read: false
  },
  {
    id: 'n2',
    type: 'comment',
    user: 'Mei Ling',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150',
    message: 'commented: "Thank you for sharing this recommendation!"',
    time: '2 hours ago',
    read: false
  },
  {
    id: 'n3',
    type: 'community',
    user: 'Autism Parents Malaysia',
    avatar: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=150',
    message: 'posted a new announcement regarding weekend park meetup.',
    time: '1 day ago',
    read: true
  }
];

export default function App() {
  // Navigation & Role State
  const [currentUser, setCurrentUser] = useState({
    role: 'parent', // 'parent' or 'organizer'
    name: 'Aishah Rahman',
    email: 'aishah@example.com',
    location: 'Shah Alam, Selangor',
    bio: 'Mother of 7-year-old Adam | Learning, growing and sharing our autism journey. 🌸',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
    cover: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800',
    childAge: '7',
    childNeeds: 'Autism Spectrum (Sensory Sensitive)'
  });

  const [activeTab, setActiveTab] = useState('home'); // 'home', 'explore', 'add', 'events', 'community'
  const [currentView, setCurrentView] = useState('app'); // 'login', 'app', 'profile', 'notifications', 'placeDetail', 'eventDetail', 'communityDetail'
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // App Master Datasets
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [places, setPlaces] = useState<(typeof INITIAL_PLACES[number] & { isSaved?: boolean })[]>(INITIAL_PLACES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [communities, setCommunities] = useState(INITIAL_COMMUNITIES);
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);

  // Detail & Selection States
const [selectedPlace, setSelectedPlace] = useState<(typeof INITIAL_PLACES[number] & { isSaved?: boolean }) | null>(null);
const [selectedEvent, setSelectedEvent] = useState<(typeof INITIAL_EVENTS[number]) | null>(null);
  const [selectedCommunity, setSelectedCommunity] = useState<(typeof INITIAL_COMMUNITIES[number]) | null>(null);

  // Modals & Action Overlays
  const [showAddMenu, setShowAddMenu] = useState(false);
 const [activeAddForm, setActiveAddForm] = useState<string | null>(null);// 'post', 'place', 'event', 'community'
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Filter & Search States
  const [placeSearch, setPlaceSearch] = useState('');
  const [placeCategory, setPlaceCategory] = useState('All Places');
  const [selectedPlaceFilters, setSelectedPlaceFilters] = useState([]);

  const [eventSearch, setEventSearch] = useState('');
  const [eventCategory, setEventCategory] = useState('All');
  const [eventFeeFilter, setEventFeeFilter] = useState('All');

  const [communitySearch, setCommunitySearch] = useState('');

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'assistant',
      text: 'Selamat sejahtera! I am Mesra Assistant. I can help you discover sensory-friendly spaces, wheelchair accessible venues, and quiet places in Selangor & KL for your child.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');

  const handleSendMessage = (textToSend) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query };
    setChatMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setChatInput('');

    // Rule-based matching against local places dataset
    setTimeout(() => {
      const q = query.toLowerCase();
      let matches: typeof places = [];

      if (q.includes('quiet') || q.includes('sensory') || q.includes('autism') || q.includes('calm')) {
        matches = places.filter(p => 
          p.accessibilityFeatures.some(f => f.toLowerCase().includes('sensory') || f.toLowerCase().includes('quiet')) ||
          p.category.includes('Sensory')
        );
      } else if (q.includes('wheelchair') || q.includes('ramp') || q.includes('physical')) {
        matches = places.filter(p => 
          p.accessibilityFeatures.some(f => f.toLowerCase().includes('wheelchair') || f.toLowerCase().includes('ramp'))
        );
      } else if (q.includes('park') || q.includes('outdoor') || q.includes('play')) {
        matches = places.filter(p => p.category.includes('Parks') || p.category.includes('Entertainment'));
      } else if (q.includes('therapy') || q.includes('rehab') || q.includes('speech')) {
        matches = places.filter(p => p.category.includes('Therapy') || p.category.includes('Rehabilitation'));
      } else {
        matches = places.slice(0, 2);
      }

      let responseText = '';
      if (matches.length > 0) {
        responseText = `Based on our verified database, here are ${matches.length} place(s) matching your needs:\n\n` +
          matches.slice(0, 3).map(m => `• ${m.name} (${m.category})\n  Key features: ${m.accessibilityFeatures.slice(0, 3).join(', ')}`).join('\n\n') +
          `\n\nTap on Explore cards to view maps and full parent reviews!`;
      } else {
        responseText = `I couldn't find an exact match in our current dataset, but you can try searching for "Sensory-Friendly", "Therapy", or "Wheelchair ramp" on the Explore tab.`;
      }

      setChatMessages((prev) => [...prev, { sender: 'assistant', text: responseText }]);
    }, 600);
  };

  const handleToggleLike = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          liked: !p.liked,
          likes: p.liked ? p.likes - 1 : p.likes + 1
        };
      }
      return p;
    }));
  };

  const handleToggleSavePost = (postId) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextSaved = !p.saved;
        showToast(nextSaved ? 'Post saved to Profile!' : 'Post removed from saved items');
        return { ...p, saved: nextSaved };
      }
      return p;
    }));
  };

  const handleAddComment = (postId, commentText) => {
    if (!commentText.trim()) return;
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [
            ...p.comments,
            {
              id: 'c_' + Date.now(),
              author: currentUser.name,
              text: commentText,
              time: 'Just now'
            }
          ]
        };
      }
      return p;
    }));
    showToast('Comment added');
  };

  const handleToggleSavePlace = (placeId) => {
    setPlaces(prev => prev.map(p => {
      if (p.id === placeId) {
        const nextSaved = !p.isSaved;
        showToast(nextSaved ? 'Place saved to Profile!' : 'Place removed from saved items');
        return { ...p, isSaved: nextSaved };
      }
      return p;
    }));
    if (selectedPlace && selectedPlace.id === placeId) {
      setSelectedPlace(prev =>
  prev ? { ...prev, isSaved: !prev.isSaved } : null
);
    }
  };

  const handleToggleSaveEvent = (eventId) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const nextSaved = !e.saved;
        showToast(nextSaved ? 'Event saved to Profile!' : 'Event removed from saved items');
        return { ...e, saved: nextSaved };
      }
      return e;
    }));
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(prev =>
  prev ? { ...prev, saved: !prev.saved } : null
);
    }
  };

 
const handleToggleJoinCommunity = (commId) => {
  setCommunities(prev => prev.map(c => {
    if (c.id === commId) {
      const nextJoined = !c.joined;
      showToast(nextJoined ? `Joined ${c.name}!` : `Left ${c.name}`);
      return {
        ...c,
        joined: nextJoined,
        members: nextJoined ? c.members + 1 : c.members - 1
      };
    }
    return c;
  }));

  if (selectedCommunity && selectedCommunity.id === commId) {
    setSelectedCommunity(prev =>
      prev
        ? {
            ...prev,
            joined: !prev.joined,
            members: !prev.joined ? prev.members + 1 : prev.members - 1
          }
        : null
    );
  }
};


  const handleCreatePost = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const content = formData.get('content');
const image = formData.get('image');

if (typeof content !== 'string' || !content.trim()) return;

    if (!content.trim()) return;

   
const newPost = {
  id: 'post_' + Date.now(),
  author: currentUser.name,
  location: currentUser.location,
  avatar: currentUser.avatar,
  time: 'Just now',
  content: content,
  image: typeof image === 'string' ? image : null,
  likes: 0,
  liked: false,
  saved: false,
  comments: []
};


    setPosts([newPost, ...posts]);
    setActiveAddForm(null);
    setShowAddMenu(false);
    setActiveTab('home');
    setCurrentView('app');
    showToast('Your post has been published to the community feed!');
  };

  const handleCreatePlace = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const category = formData.get('category');
    const address = formData.get('address');
    const contact = formData.get('contact');
    const description = formData.get('description');
    const review = formData.get('review');
    
    // Checked features
    const selectedFeatures: string[] = [];
    ['Wheelchair ramp', 'Sensory play zone', 'Accessible toilets', 'Quiet rest areas', 'Wide pathways', 'Therapy services'].forEach(feat => {
      if (formData.get(feat)) selectedFeatures.push(feat);
    });

    
const newPlace = {
  id: 'place_' + Date.now(),
  name: String(name ?? ''),
  address: String(address ?? ''),
  contact: String(contact || 'Information unavailable'),
  rating: 5.0,
  description: String(description ?? ''),
  category: String(category || 'Other Accessible Places'),
  accessibilityFeatures: selectedFeatures.length > 0
    ? selectedFeatures
    : ['Wheelchair-friendly access'],
  verificationStatus: 'Pending verification',
  reviewCount: 1,
  sampleReview: String(review || 'Newly submitted place by community member.')
};


    setPlaces([newPlace, ...places]);
    setActiveAddForm(null);
    setShowAddMenu(false);
    setActiveTab('explore');
    setCurrentView('app');
    showToast('Place submitted! Marked as "Pending Verification".');
  };

  const handleCreateEvent = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const title = formData.get('title');
    const venue = formData.get('venue');
    const date = formData.get('date');
    const time = formData.get('time');
    const category = formData.get('category');
    const feeType = formData.get('feeType');
    const feeAmount = formData.get('feeAmount');
    const description = formData.get('description');
    const registrationUrl = formData.get('registrationUrl');
    const contact = formData.get('contact');
    const eligibility = formData.get('eligibility');

    
const newEvent = {
  id: 'event_' + Date.now(),
  title: String(title ?? ''),
  venue: String(venue ?? ''),
  address: String(venue ?? ''),
  date: String(date ?? ''),
  time: String(time ?? ''),
  organizer: currentUser.name,
  organizerType: currentUser.role === 'organizer' ? 'NGO / Public Organizer' : 'Parent',
  fee: String(feeType ?? 'Free'),
  feeAmount: feeType === 'Paid' ? String(feeAmount || 'RM 10') : '0',
  category: String(category || 'Special Needs Activities'),
  description: String(description ?? ''),
  eligibility: String(eligibility || 'Open to all children and families'),
  contact: String(contact || currentUser.email),
  registrationUrl: String(registrationUrl || ''),
  saved: false,
  image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=600',
  status: currentUser.role === 'organizer' ? 'Published' : 'Pending'
};


    setEvents([newEvent, ...events]);
    setActiveAddForm(null);
    setShowAddMenu(false);
    if (currentUser.role === 'organizer') {
      showToast('Event created and published!');
    } else {
      setActiveTab('events');
      setCurrentView('app');
      showToast('Event submitted for community discovery!');
    }
  };

  const handleCreateCommunity = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const rulesStr = formData.get('rules');

   
const newComm = {
  id: 'comm_' + Date.now(),
  name: String(name ?? ''),
  description: String(description ?? ''),
  category: String(category ?? ''),
  members: 1,
  joined: true,
  cover: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600',
  rules: typeof rulesStr === 'string' && rulesStr.trim()
    ? rulesStr.split('\n')
    : ['Be respectful to all parents.']
};


    setCommunities([newComm, ...communities]);
    setActiveAddForm(null);
    setShowAddMenu(false);
    setActiveTab('community');
    setCurrentView('app');
    showToast(`Community "${name}" created!`);
  };

  const filteredPlaces = places.filter(place => {
    const matchesSearch = place.name.toLowerCase().includes(placeSearch.toLowerCase()) ||
                          place.description.toLowerCase().includes(placeSearch.toLowerCase()) ||
                          place.address.toLowerCase().includes(placeSearch.toLowerCase());
    const matchesCategory = placeCategory === 'All Places' || place.category === placeCategory;
    
    const matchesFeatures = selectedPlaceFilters.length === 0 || 
      selectedPlaceFilters.every(filter => place.accessibilityFeatures.includes(filter));

    return matchesSearch && matchesCategory && matchesFeatures;
  });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
                          event.venue.toLowerCase().includes(eventSearch.toLowerCase()) ||
                          event.description.toLowerCase().includes(eventSearch.toLowerCase());
    const matchesCategory = eventCategory === 'All' || event.category.includes(eventCategory);
    const matchesFee = eventFeeFilter === 'All' || event.fee === eventFeeFilter;
    
    return matchesSearch && matchesCategory && matchesFee;
  });

  const filteredCommunities = communities.filter(c => 
    c.name.toLowerCase().includes(communitySearch.toLowerCase()) ||
    c.description.toLowerCase().includes(communitySearch.toLowerCase()) ||
    c.category.toLowerCase().includes(communitySearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-stone-100 flex justify-center items-center p-0 md:p-4 font-sans text-stone-800">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 z-50 bg-[#493B40] text-white px-4 py-2.5 rounded-full shadow-lg text-sm flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={18} className="text-[#8BAE91]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Mobile App Frame Container */}
      <div className="w-full max-w-md h-[100vh] md:h-[880px] bg-[#FFF9F5] rounded-none md:rounded-[36px] shadow-2xl overflow-hidden flex flex-col relative border-0 md:border-[6px] border-stone-800">

        {/* Top Simulated Status Bar */}
        <div className="bg-[#493B40] text-white px-5 py-2 flex justify-between items-center text-xs font-medium z-30">
          <span className="font-semibold">MesraIstimewa</span>
          <div className="flex items-center gap-3">
            {/* Quick Switch Role Indicator */}
            <button 
              onClick={() => {
                const nextRole = currentUser.role === 'parent' ? 'organizer' : 'parent';
                setCurrentUser(prev => ({
                  ...prev,
                  role: nextRole,
                  name: nextRole === 'organizer' ? 'Autism Support Association (NGO)' : 'Aishah Rahman'
                }));
                showToast(`Switched to ${nextRole.toUpperCase()} mode`);
              }}
              className="bg-[#C76F8A] hover:bg-[#b05c75] px-2 py-0.5 rounded text-[10px] text-white font-semibold transition"
            >
              Role: {currentUser.role === 'parent' ? 'Parent 👨‍👩‍👧' : 'Organizer 🏢'}
            </button>
            <span>09:41</span>
          </div>
        </div>

        {/* AUTHENTICATION SCREEN */}
        {!isLoggedIn ? (
          <AuthScreen 
            onLogin={(role, name) => {
              setCurrentUser(prev => ({ ...prev, role, name }));
              setIsLoggedIn(true);
              showToast(`Welcome back, ${name}!`);
            }}
          />
        ) : currentUser.role === 'organizer' ? (
          /* ORGANIZER INTERFACE (PART B) */
          <OrganizerView 
            currentUser={currentUser}
            events={events}
            setEvents={setEvents}
            onLogout={() => setIsLoggedIn(false)}
            onOpenAddEvent={() => setActiveAddForm('event')}
          />
        ) : (
          /* PARENTS INTERFACE (PART A) */
          <div className="flex-1 flex flex-col overflow-hidden relative">

            {/* PARENT TOP HEADER (Except special full screen views) */}
            {currentView === 'app' && (
              <header className="bg-white/90 backdrop-blur-md border-b border-[#F0E1E6] px-4 py-3 flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#F4B8C8] flex items-center justify-center font-bold text-[#493B40] text-sm shadow-sm">
                    M
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-[#493B40] leading-none">MesraIstimewa</h1>
                    <p className="text-[10px] text-[#897A80]">Inclusive Parent Community</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Notification Icon */}
                  <button 
                    onClick={() => setCurrentView('notifications')}
                    className="relative p-2 rounded-full hover:bg-[#F9DCE4] transition text-[#493B40]"
                    aria-label="Notifications"
                  >
                    <Bell size={20} />
                    {notifications.some(n => !n.read) && (
                      <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#C76F8A] rounded-full ring-2 ring-white"></span>
                    )}
                  </button>

                  {/* Profile Picture Icon */}
                  <button 
                    onClick={() => setCurrentView('profile')}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#F4B8C8] hover:opacity-90 transition"
                  >
                    <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
                  </button>
                </div>
              </header>
            )}

            {/* PARENT SCREEN VIEWS */}
            <main className="flex-1 overflow-y-auto relative pb-20 bg-[#FFF9F5]">

              {/* VIEW 1: MAIN TAB NAVIGATION CONTENT */}
              {currentView === 'app' && (
                <>
                  {/* TAB 1: HOME FEED (Threads style - Parent Posts Only) */}
                  {activeTab === 'home' && (
                    <HomeFeedTab 
                      posts={posts} 
                      onLike={handleToggleLike}
                      onSave={handleToggleSavePost}
                      onAddComment={handleAddComment}
                    />
                  )}

                  {/* TAB 2: EXPLORE ACCESSIBLE PLACES */}
                  {activeTab === 'explore' && (
                    <ExplorePlacesTab 
                      places={filteredPlaces}
                      search={placeSearch}
                      setSearch={setPlaceSearch}
                      category={placeCategory}
                      setCategory={setPlaceCategory}
                      selectedFilters={selectedPlaceFilters}
                      setSelectedFilters={setSelectedPlaceFilters}
                      onSelectPlace={(place) => {
                        setSelectedPlace(place);
                        setCurrentView('placeDetail');
                      }}
                    />
                  )}

                  {/* TAB 4: EVENTS DISCOVERY */}
                  {activeTab === 'events' && (
                    <EventsTab 
                      events={filteredEvents}
                      search={eventSearch}
                      setSearch={setEventSearch}
                      category={eventCategory}
                      setCategory={setEventCategory}
                      feeFilter={eventFeeFilter}
                      setFeeFilter={setEventFeeFilter}
                      onSelectEvent={(evt) => {
                        setSelectedEvent(evt);
                        setCurrentView('eventDetail');
                      }}
                      onSaveEvent={handleToggleSaveEvent}
                    />
                  )}

                  {/* TAB 5: COMMUNITY DISCOVERY */}
                  {activeTab === 'community' && (
                    <CommunityTab 
                      communities={filteredCommunities}
                      search={communitySearch}
                      setSearch={setCommunitySearch}
                      onSelectCommunity={(comm) => {
                        setSelectedCommunity(comm);
                        setCurrentView('communityDetail');
                      }}
                      onJoinToggle={handleToggleJoinCommunity}
                      onCreateCommunity={() => setActiveAddForm('community')}
                    />
                  )}
                </>
              )}

              {/* VIEW 2: NOTIFICATIONS PAGE */}
              {currentView === 'notifications' && (
                <NotificationsScreen 
                  notifications={notifications}
                  setNotifications={setNotifications}
                  onBack={() => setCurrentView('app')}
                />
              )}

              {/* VIEW 3: PARENT PROFILE PAGE */}
              {currentView === 'profile' && (
                <ParentProfileScreen 
                  currentUser={currentUser}
                  posts={posts.filter(p => p.author === currentUser.name)}
                  savedPosts={posts.filter(p => p.saved)}
                  savedPlaces={places.filter(p => p.isSaved)}
                  savedEvents={events.filter(e => e.saved)}
                  onBack={() => setCurrentView('app')}
                  onEditProfile={() => setShowEditProfile(true)}
                  onLogout={() => setIsLoggedIn(false)}
                  onSelectPlace={(place) => {
                    setSelectedPlace(place);
                    setCurrentView('placeDetail');
                  }}
                  onSelectEvent={(evt) => {
                    setSelectedEvent(evt);
                    setCurrentView('eventDetail');
                  }}
                  onLike={handleToggleLike}
                  onSavePost={handleToggleSavePost}
                  onAddComment={handleAddComment}
                />
              )}

              {/* VIEW 4: PLACE DETAILS VIEW */}
              {currentView === 'placeDetail' && selectedPlace && (
                <PlaceDetailScreen 
                  place={selectedPlace}
                  onBack={() => setCurrentView('app')}
                  onSave={handleToggleSavePlace}
                  onReport={() => setShowReportModal(true)}
                />
              )}

              {/* VIEW 5: EVENT DETAILS VIEW */}
              {currentView === 'eventDetail' && selectedEvent && (
                <EventDetailScreen 
                  event={selectedEvent}
                  onBack={() => setCurrentView('app')}
                  onSave={handleToggleSaveEvent}
                />
              )}

              {/* VIEW 6: COMMUNITY DETAILS VIEW */}
              {currentView === 'communityDetail' && selectedCommunity && (
                <CommunityDetailScreen 
                  community={selectedCommunity}
                  onBack={() => setCurrentView('app')}
                  onJoinToggle={handleToggleJoinCommunity}
                />
              )}

            </main>

            {/* FLOATING AI CHATBOT LAUNCHER (Explore Tab Only) */}
            {currentView === 'app' && activeTab === 'explore' && (
              <button 
                onClick={() => setShowChatbot(true)}
                className="fixed md:absolute bottom-20 right-5 z-20 bg-[#C76F8A] text-white p-3.5 rounded-full shadow-xl hover:scale-105 transition flex items-center gap-2"
                aria-label="Open Mesra Assistant Chatbot"
              >
                <Sparkles size={20} />
                <span className="text-xs font-semibold pr-1">Mesra Assistant</span>
              </button>
            )}

            {/* PARENT FIXED BOTTOM NAVIGATION BAR (PART A - Item 4) */}
            {currentView === 'app' && (
              <nav className="bg-white border-t border-[#F0E1E6] px-2 py-2 flex justify-around items-center fixed md:absolute bottom-0 left-0 right-0 z-30 shadow-lg">
                <BottomNavButton 
                  icon={<Compass size={22} />} 
                  label="Home" 
                  active={activeTab === 'home'} 
                  onClick={() => setActiveTab('home')} 
                />
                <BottomNavButton 
                  icon={<Search size={22} />} 
                  label="Explore" 
                  active={activeTab === 'explore'} 
                  onClick={() => setActiveTab('explore')} 
                />

                {/* Outstanding Central Add (+) Button */}
                <button 
                  onClick={() => setShowAddMenu(true)}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#C76F8A] to-[#F4B8C8] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition -mt-5 ring-4 ring-[#FFF9F5]"
                  aria-label="Add content"
                >
                  <Plus size={28} strokeWidth={2.5} />
                </button>

                <BottomNavButton 
                  icon={<Calendar size={22} />} 
                  label="Events" 
                  active={activeTab === 'events'} 
                  onClick={() => setActiveTab('events')} 
                />
                <BottomNavButton 
                  icon={<Users size={22} />} 
                  label="Community" 
                  active={activeTab === 'community'} 
                  onClick={() => setActiveTab('community')} 
                />
              </nav>
            )}

          </div>
        )}

        {/* OVERLAY MODAL 1: ADD POP-UP ACTION MENU (PART A - Item 7) */}
        {showAddMenu && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center p-4">
            <div className="bg-white rounded-t-3xl rounded-b-xl w-full max-w-sm p-5 shadow-2xl animate-in slide-in-from-bottom duration-200">
              <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h3 className="font-bold text-[#493B40] text-base">Create New Content</h3>
                <button onClick={() => setShowAddMenu(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-3">
                <AddMenuOption 
                  icon={<MessageCircle className="text-[#C76F8A]" size={22} />}
                  title="Add Post"
                  desc="Share parenting experience, advice, or therapy win"
                  onClick={() => { setShowAddMenu(false); setActiveAddForm('post'); }}
                />
                <AddMenuOption 
                  icon={<MapPin className="text-[#8BAE91]" size={22} />}
                  title="Add Place"
                  desc="Contribute an accessible or sensory-friendly location"
                  onClick={() => { setShowAddMenu(false); setActiveAddForm('place'); }}
                />
                <AddMenuOption 
                  icon={<Calendar className="text-amber-500" size={22} />}
                  title="Add Event"
                  desc="Submit a support group, activity, or workshop"
                  onClick={() => { setShowAddMenu(false); setActiveAddForm('event'); }}
                />
              </div>
            </div>
          </div>
        )}

        {/* OVERLAY MODAL 2: ADD CONTENT FORMS */}
        {activeAddForm === 'post' && (
          <AddPostForm onClose={() => setActiveAddForm(null)} onSubmit={handleCreatePost} />
        )}
        {activeAddForm === 'place' && (
          <AddPlaceForm onClose={() => setActiveAddForm(null)} onSubmit={handleCreatePlace} />
        )}
        {activeAddForm === 'event' && (
          <AddEventForm onClose={() => setActiveAddForm(null)} onSubmit={handleCreateEvent} isOrganizer={currentUser.role === 'organizer'} />
        )}
        {activeAddForm === 'community' && (
          <AddCommunityForm onClose={() => setActiveAddForm(null)} onSubmit={handleCreateCommunity} />
        )}

        {/* OVERLAY MODAL 3: MESRA CHATBOT ASSISTANT */}
        {showChatbot && (
          <ChatbotModal 
            messages={chatMessages}
            input={chatInput}
            setInput={setChatInput}
            onSend={handleSendMessage}
            onClose={() => setShowChatbot(false)}
          />
        )}

        {/* OVERLAY MODAL 4: EDIT PROFILE */}
        {showEditProfile && (
          <EditProfileModal 
            currentUser={currentUser}
            onSave={(updated) => {
              setCurrentUser(updated);
              setShowEditProfile(false);
              showToast('Profile updated successfully');
            }}
            onClose={() => setShowEditProfile(false)}
          />
        )}

        {/* OVERLAY MODAL 5: REPORT INACCURATE PLACE INFO */}
        {showReportModal && (
          <ReportModal 
            placeName={selectedPlace?.name}
            onClose={() => setShowReportModal(false)}
            onSubmit={() => {
              setShowReportModal(false);
              showToast('Report submitted for moderation review.');
            }}
          />
        )}

      </div>
    </div>
  );
}

function BottomNavButton({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick} 
      className={`flex flex-col items-center gap-1 transition ${
        active ? 'text-[#C76F8A] font-semibold' : 'text-[#897A80] hover:text-[#493B40]'
      }`}
    >
      {icon}
      <span className="text-[11px]">{label}</span>
    </button>
  );
}

function AddMenuOption({ icon, title, desc, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full text-left p-3.5 rounded-2xl border border-[#F0E1E6] bg-[#FFF9F5] hover:bg-[#F9DCE4]/50 transition flex items-center gap-3.5"
    >
      <div className="p-2.5 bg-white rounded-xl shadow-sm">{icon}</div>
      <div>
        <h4 className="font-semibold text-[#493B40] text-sm">{title}</h4>
        <p className="text-xs text-[#897A80]">{desc}</p>
      </div>
    </button>
  );
}

function AuthScreen({ onLogin }) {
  const [role, setRole] = useState('parent'); // 'parent' or 'organizer'
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const displayName = name || (role === 'parent' ? 'Aishah Rahman' : 'Selangor OKU Youth NGO');
    onLogin(role, displayName);
  };

  return (
    <div className="flex-1 bg-[#FFF9F5] flex flex-col justify-between p-6 overflow-y-auto">
      <div className="pt-6 text-center space-y-2">
        <div className="w-16 h-16 bg-[#F4B8C8] rounded-2xl flex items-center justify-center font-bold text-[#493B40] text-2xl mx-auto shadow-md">
          M
        </div>
        <h2 className="text-2xl font-bold text-[#493B40]">MesraIstimewa</h2>
        <p className="text-xs text-[#C76F8A] italic max-w-xs mx-auto">
          "A more inclusive world starts with community."
        </p>
      </div>

      <div className="bg-white p-5 rounded-3xl shadow-sm border border-[#F0E1E6] my-6 space-y-4">
        
        {/* Role Selector Tabs */}
        <div className="flex bg-[#FFF9F5] p-1 rounded-xl border border-[#F0E1E6]">
          <button 
            type="button"
            onClick={() => setRole('parent')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              role === 'parent' ? 'bg-[#F4B8C8] text-[#493B40] shadow-sm' : 'text-[#897A80]'
            }`}
          >
            Parent Account
          </button>
          <button 
            type="button"
            onClick={() => setRole('organizer')}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              role === 'organizer' ? 'bg-[#F4B8C8] text-[#493B40] shadow-sm' : 'text-[#897A80]'
            }`}
          >
            Organizer
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#493B40] mb-1">
                {role === 'parent' ? 'Full Name' : 'Organization Name'}
              </label>
              <input 
                type="text" 
                required
                placeholder={role === 'parent' ? 'e.g. Aishah Rahman' : 'e.g. Selangor Special Needs NGO'}
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0E1E6] text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B8C8]"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Email Address</label>
            <input 
              type="email" 
              required
              placeholder="parent@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0E1E6] text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B8C8]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Password</label>
            <input 
              type="password" 
              required
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-[#F0E1E6] text-sm focus:outline-none focus:ring-2 focus:ring-[#F4B8C8]"
            />
          </div>

          {mode === 'login' && (
            <div className="text-right">
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link simulated.'); }} className="text-[11px] text-[#C76F8A] hover:underline">
                Forgot password?
              </a>
            </div>
          )}

          <button 
            type="submit"
            className="w-full py-3 bg-[#C76F8A] text-white rounded-xl font-semibold text-sm shadow-md hover:bg-[#b05c75] transition"
          >
            {mode === 'login' ? `Login as ${role === 'parent' ? 'Parent' : 'Organizer'}` : 'Create Account'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-[#897A80]">
          {mode === 'login' ? (
            <span>Don't have an account? <button onClick={() => setMode('signup')} className="text-[#C76F8A] font-semibold underline">Sign up</button></span>
          ) : (
            <span>Already registered? <button onClick={() => setMode('login')} className="text-[#C76F8A] font-semibold underline">Login</button></span>
          )}
        </div>
      </div>

      <div className="text-center text-[11px] text-[#897A80]">
        Demo prototype for university showcase. Safe & inclusive space.
      </div>
    </div>
  );
}

function HomeFeedTab({ posts, onLike, onSave, onAddComment }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center bg-[#F9DCE4]/40 p-3 rounded-2xl border border-[#F0E1E6]">
        <p className="text-xs text-[#493B40]">
          💬 <b>Community Feed</b> — Share therapy experiences, advice requests, and inclusive wins.
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 text-[#897A80] space-y-2">
          <MessageCircle size={36} className="mx-auto text-[#C76F8A]" />
          <p className="text-sm font-semibold">No posts yet</p>
          <p className="text-xs">Be the first parent to share an experience!</p>
        </div>
      ) : (
        posts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={() => onLike(post.id)}
            onSave={() => onSave(post.id)}
            onAddComment={(text) => onAddComment(post.id, text)}
          />
        ))
      )}
    </div>
  );
}

function PostCard({ post, onLike, onSave, onAddComment }) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText);
      setCommentText('');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-4 shadow-sm border border-[#F0E1E6] space-y-3">
      {/* Post Author Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <img src={post.avatar} alt={post.author} className="w-9 h-9 rounded-full object-cover border border-[#F4B8C8]" />
          <div>
            <h4 className="font-semibold text-[#493B40] text-sm leading-tight">{post.author}</h4>
            <div className="flex items-center gap-1 text-[11px] text-[#897A80]">
              <span>{post.location}</span>
              <span>•</span>
              <span>{post.time}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <p className="text-xs text-[#493B40] leading-relaxed whitespace-pre-line">
        {post.content}
      </p>

      {/* Image if any */}
      {post.image && (
        <div className="rounded-2xl overflow-hidden max-h-60 border border-stone-100">
          <img src={post.image} alt="Post attachment" className="w-full h-full object-cover" />
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between pt-2 border-t border-[#F0E1E6]/60 text-[#897A80]">
        <button 
          onClick={onLike}
          className={`flex items-center gap-1.5 text-xs font-medium transition ${post.liked ? 'text-rose-500' : 'hover:text-[#493B40]'}`}
        >
          <Heart size={18} className={post.liked ? 'fill-rose-500 text-rose-500' : ''} />
          <span>{post.likes}</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 text-xs hover:text-[#493B40] transition"
        >
          <MessageCircle size={18} />
          <span>{post.comments.length} Comments</span>
        </button>

        <button 
          onClick={onSave}
          className={`p-1 hover:text-[#493B40] transition ${post.saved ? 'text-[#C76F8A]' : ''}`}
        >
          <Bookmark size={18} className={post.saved ? 'fill-[#C76F8A]' : ''} />
        </button>

        <button 
          onClick={() => alert('Post link copied to clipboard!')}
          className="p-1 hover:text-[#493B40] transition"
        >
          <Share2 size={18} />
        </button>
      </div>

      {/* Expandable Comments Section */}
      {showComments && (
        <div className="pt-3 border-t border-dashed border-[#F0E1E6] space-y-3 bg-[#FFF9F5] -mx-4 -mb-4 p-4 rounded-b-3xl">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {post.comments.length === 0 ? (
              <p className="text-[11px] text-[#897A80] italic text-center">No comments yet. Start the conversation!</p>
            ) : (
              post.comments.map(c => (
                <div key={c.id} className="bg-white p-2.5 rounded-xl border border-[#F0E1E6] text-xs space-y-1">
                  <div className="flex justify-between font-medium text-[#493B40]">
                    <span>{c.author}</span>
                    <span className="text-[10px] text-[#897A80]">{c.time}</span>
                  </div>
                  <p className="text-[#493B40]">{c.text}</p>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Write a supportive comment..."
              value={commentText}
              onChange={e => setCommentText(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs rounded-xl border border-[#F0E1E6] focus:outline-none focus:ring-1 focus:ring-[#F4B8C8]"
            />
            <button 
              type="submit"
              className="px-3 py-1.5 bg-[#C76F8A] text-white rounded-xl text-xs font-medium hover:bg-[#b05c75]"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function ExplorePlacesTab({ places, search, setSearch, category, setCategory, selectedFilters, setSelectedFilters, onSelectPlace }) {
  const categoriesList = [
    'All Places', 'Therapy Centres', 'Learning Centres', 'Rehabilitation Centres', 
    'Parks and Playgrounds', 'Sensory-Friendly Spaces', 'Family Entertainment', 'Other Accessible Places'
  ];

  const filterOptions = [
    'Wheelchair ramp', 'Sensory play zone', 'Accessible toilets', 
    'Quiet rest areas', 'Wide pathways', 'Therapy services', 'Sensory-friendly environment'
  ];

  const toggleFilter = (item) => {
    if (selectedFilters.includes(item)) {
      setSelectedFilters(selectedFilters.filter(f => f !== item));
    } else {
      setSelectedFilters([...selectedFilters, item]);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-[#493B40]">Explore Places</h2>
        <p className="text-xs text-[#897A80]">Discover verified OKU & sensory-friendly locations</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-3 text-[#897A80]" />
        <input 
          type="text" 
          placeholder="Find a place for your family..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-[#F0E1E6] text-xs focus:outline-none focus:ring-2 focus:ring-[#F4B8C8]"
        />
      </div>

      {/* Category Chips Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categoriesList.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              category === cat 
                ? 'bg-[#C76F8A] text-white shadow-sm' 
                : 'bg-white text-[#897A80] border border-[#F0E1E6] hover:bg-[#F9DCE4]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accessibility Filters Multi-Select */}
      <div className="bg-white p-3 rounded-2xl border border-[#F0E1E6] space-y-2">
        <div className="flex justify-between items-center text-xs font-semibold text-[#493B40]">
          <span className="flex items-center gap-1.5"><Filter size={14} /> Filter Accessibility Features</span>
          {selectedFilters.length > 0 && (
            <button onClick={() => setSelectedFilters([])} className="text-[10px] text-[#C76F8A] underline">Clear</button>
          )}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {filterOptions.map(feat => {
            const active = selectedFilters.includes(feat);
            return (
              <button
                key={feat}
                onClick={() => toggleFilter(feat)}
                className={`px-2.5 py-1 rounded-lg text-[11px] transition ${
                  active 
                    ? 'bg-[#8BAE91] text-white font-medium' 
                    : 'bg-[#FFF9F5] text-[#897A80] border border-[#F0E1E6]'
                }`}
              >
                {active ? '✓ ' : '+ '}{feat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Place Cards List */}
      <div className="space-y-3">
        {places.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-[#F0E1E6] p-6 text-[#897A80]">
            <MapPin size={32} className="mx-auto text-[#C76F8A] mb-2" />
            <p className="font-semibold text-sm">No places match your search</p>
            <p className="text-xs">Try clearing some accessibility filters.</p>
          </div>
        ) : (
          places.map(place => (
            <PlaceCard key={place.id} place={place} onClick={() => onSelectPlace(place)} />
          ))
        )}
      </div>
    </div>
  );
}

function PlaceCard({ place, onClick }) {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`;

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-3xl p-4 border border-[#F0E1E6] shadow-sm hover:shadow-md transition cursor-pointer space-y-2.5"
    >
      <div className="flex justify-between items-start gap-2">
        <div>
          <span className="text-[10px] font-semibold text-[#C76F8A] bg-[#F9DCE4] px-2 py-0.5 rounded-md">
            {place.category}
          </span>
          <h3 className="font-bold text-[#493B40] text-sm mt-1">{place.name}</h3>
        </div>
        <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-lg text-xs font-semibold text-amber-700">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          <span>{place.rating}</span>
        </div>
      </div>

      {/* Accessibility Feature Badges */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {place.accessibilityFeatures.map((feat, idx) => (
          <span key={idx} className="bg-[#FFF9F5] border border-[#F0E1E6] text-[#493B40] text-[10px] px-2 py-0.5 rounded-md flex items-center gap-1">
            <Check size={10} className="text-[#8BAE91]" />
            {feat}
          </span>
        ))}
      </div>

      {/* Parent Review Summary */}
      <p className="text-[11px] text-[#897A80] italic bg-[#FFF9F5] p-2 rounded-xl line-clamp-2">
        "{place.sampleReview}"
      </p>

      {/* Map Link Button */}
      <div className="flex justify-between items-center pt-2 border-t border-[#F0E1E6]/60">
        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
          place.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
        }`}>
          {place.verificationStatus}
        </span>

        <a 
          href={mapSearchUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-xs font-medium text-[#C76F8A] hover:underline flex items-center gap-1"
        >
          <ExternalLink size={12} />
          <span>View on Google Maps</span>
        </a>
      </div>
    </div>
  );
}

function PlaceDetailScreen({ place, onBack, onSave, onReport }) {
  const mapSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name + ' ' + place.address)}`;

  return (
    <div className="p-4 space-y-4 bg-[#FFF9F5] min-h-full">
      <button onClick={onBack} className="flex items-center gap-1 text-xs text-[#C76F8A] font-semibold">
        <ChevronLeft size={18} /> Back to Explore
      </button>

      <div className="bg-white rounded-3xl p-5 border border-[#F0E1E6] shadow-sm space-y-4">
        <div>
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-[#C76F8A] bg-[#F9DCE4] px-2.5 py-1 rounded-lg">
              {place.category}
            </span>
            <button onClick={() => onSave(place.id)} className="p-2 text-[#C76F8A]">
              <Bookmark size={20} className={place.isSaved ? 'fill-[#C76F8A]' : ''} />
            </button>
          </div>
          <h2 className="text-lg font-bold text-[#493B40] mt-2">{place.name}</h2>
          <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>{place.rating} ({place.reviewCount || 10} reviews)</span>
          </div>
        </div>

        <div className="space-y-2 text-xs text-[#493B40] border-t border-[#F0E1E6] pt-3">
          <p className="flex items-start gap-2">
            <MapPin size={16} className="text-[#C76F8A] shrink-0 mt-0.5" />
            <span>{place.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} className="text-[#8BAE91] shrink-0" />
            <span>{place.contact}</span>
          </p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#493B40] mb-1">Description</h4>
          <p className="text-xs text-[#897A80] leading-relaxed">{place.description}</p>
        </div>

        <div>
          <h4 className="text-xs font-bold text-[#493B40] mb-2">Accessibility Features & Verification</h4>
          <div className="space-y-1.5">
            {place.accessibilityFeatures.map((feat, idx) => (
              <div key={idx} className="flex items-center justify-between bg-[#FFF9F5] p-2 rounded-xl text-xs border border-[#F0E1E6]">
                <span className="text-[#493B40] font-medium">{feat}</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold">
                  {place.verificationStatus || 'Listed'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-2">
          <a 
            href={mapSearchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 bg-[#C76F8A] text-white rounded-xl text-center text-xs font-semibold shadow-md flex items-center justify-center gap-2"
          >
            <Navigation size={14} /> Open in Google Maps
          </a>

          <button 
            onClick={onReport}
            className="w-full py-2 bg-stone-100 text-[#897A80] rounded-xl text-xs font-medium hover:bg-stone-200"
          >
            Report Inaccurate Information
          </button>
        </div>
      </div>
    </div>
  );
}

function EventsTab({ events, search, setSearch, category, setCategory, feeFilter, setFeeFilter, onSelectEvent, onSaveEvent }) {
  const eventCategories = [
    'All', 'Autism and Special Needs Activities', 'Therapy and Development', 
    'Parent Support Groups', 'Workshops and Talks', 'Family Activities'
  ];

  return (
    <div className="p-4 space-y-4">
      <div>
        <h2 className="text-lg font-bold text-[#493B40]">Events & Activities</h2>
        <p className="text-xs text-[#897A80]">Support programs, inclusive workshops, and meetups</p>
      </div>

      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-3 text-[#897A80]" />
        <input 
          type="text" 
          placeholder="Search events, programs, venues..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-[#F0E1E6] text-xs focus:outline-none focus:ring-2 focus:ring-[#F4B8C8]"
        />
      </div>

      {/* Category Scroll */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {eventCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
              category === cat 
                ? 'bg-[#C76F8A] text-white' 
                : 'bg-white text-[#897A80] border border-[#F0E1E6]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Fee Filter */}
      <div className="flex gap-2 items-center text-xs">
        <span className="text-[#897A80] font-medium">Fee:</span>
        {['All', 'Free', 'Paid'].map(fee => (
          <button
            key={fee}
            onClick={() => setFeeFilter(fee)}
            className={`px-2.5 py-1 rounded-lg transition ${
              feeFilter === fee ? 'bg-[#493B40] text-white' : 'bg-white text-[#897A80] border border-[#F0E1E6]'
            }`}
          >
            {fee}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div className="space-y-3">
        {events.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-[#F0E1E6] p-6 text-[#897A80]">
            <Calendar size={32} className="mx-auto text-[#C76F8A] mb-2" />
            <p className="font-semibold text-sm">No events found</p>
          </div>
        ) : (
          events.map(evt => (
            <div 
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="bg-white rounded-3xl overflow-hidden border border-[#F0E1E6] shadow-sm hover:shadow-md transition cursor-pointer"
            >
              {evt.image && (
                <div className="h-32 w-full overflow-hidden relative">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover" />
                  <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-[#493B40]">
                    {evt.fee === 'Free' ? 'FREE' : evt.feeAmount}
                  </span>
                </div>
              )}
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-semibold text-[#C76F8A] bg-[#F9DCE4] px-2 py-0.5 rounded">
                  {evt.category}
                </span>
                <h3 className="font-bold text-[#493B40] text-sm">{evt.title}</h3>

                <div className="space-y-1 text-xs text-[#897A80]">
                  <p className="flex items-center gap-1.5"><Calendar size={13} /> {evt.date} • {evt.time}</p>
                  <p className="flex items-center gap-1.5"><MapPin size={13} /> {evt.venue}</p>
                  <p className="flex items-center gap-1.5"><User size={13} /> {evt.organizer} ({evt.organizerType})</p>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-[#F0E1E6]">
                  <span className="text-xs text-[#C76F8A] font-semibold">View Details →</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); onSaveEvent(evt.id); }}
                    className="p-1 text-[#C76F8A]"
                  >
                    <Bookmark size={18} className={evt.saved ? 'fill-[#C76F8A]' : ''} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function EventDetailScreen({ event, onBack, onSave }) {
  return (
    <div className="p-4 space-y-4 bg-[#FFF9F5] min-h-full">
      <button onClick={onBack} className="flex items-center gap-1 text-xs text-[#C76F8A] font-semibold">
        <ChevronLeft size={18} /> Back to Events
      </button>

      <div className="bg-white rounded-3xl overflow-hidden border border-[#F0E1E6] shadow-sm">
        {event.image && (
          <img src={event.image} alt={event.title} className="w-full h-44 object-cover" />
        )}

        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-[#C76F8A] bg-[#F9DCE4] px-2.5 py-1 rounded-lg">
              {event.category}
            </span>
            <button onClick={() => onSave(event.id)} className="p-1 text-[#C76F8A]">
              <Bookmark size={20} className={event.saved ? 'fill-[#C76F8A]' : ''} />
            </button>
          </div>

          <h2 className="text-lg font-bold text-[#493B40]">{event.title}</h2>

          <div className="bg-[#FFF9F5] p-3 rounded-2xl space-y-2 border border-[#F0E1E6] text-xs text-[#493B40]">
            <p className="flex items-center gap-2"><Calendar size={15} className="text-[#C76F8A]" /> <b>Date:</b> {event.date}</p>
            <p className="flex items-center gap-2"><Clock size={15} className="text-[#C76F8A]" /> <b>Time:</b> {event.time}</p>
            <p className="flex items-center gap-2"><MapPin size={15} className="text-[#C76F8A]" /> <b>Venue:</b> {event.venue}</p>
            <p className="flex items-center gap-2"><User size={15} className="text-[#8BAE91]" /> <b>Organizer:</b> {event.organizer} ({event.organizerType})</p>
            <p className="flex items-center gap-2"><Phone size={15} className="text-[#8BAE91]" /> <b>Contact:</b> {event.contact}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#493B40] mb-1">About the Event</h4>
            <p className="text-xs text-[#897A80] leading-relaxed">{event.description}</p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-[#493B40] mb-1">Eligibility</h4>
            <p className="text-xs text-[#897A80]">{event.eligibility}</p>
          </div>

          {/* Registration Rule: External Link Notice */}
          <div className="pt-3 border-t border-[#F0E1E6] space-y-2">
            {event.registrationUrl ? (
              <a 
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-[#C76F8A] text-white rounded-xl text-center text-xs font-semibold shadow-md flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} /> Register via External Site
              </a>
            ) : (
              <div className="p-3 bg-amber-50 rounded-xl text-xs text-amber-800 border border-amber-200">
                Contact organizer directly at <b>{event.contact}</b> for registration.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function CommunityTab({ communities, search, setSearch, onSelectCommunity, onJoinToggle, onCreateCommunity }) {
  const joinedCommunities = communities.filter(c => c.joined);

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-[#493B40]">Parent Communities</h2>
          <p className="text-xs text-[#897A80]">Connect with specialized support groups</p>
        </div>
        <button 
          onClick={onCreateCommunity}
          className="px-3 py-1.5 bg-[#C76F8A] text-white rounded-xl text-xs font-semibold flex items-center gap-1 shadow-sm"
        >
          <Plus size={14} /> Create
        </button>
      </div>

      {/* Joined Communities Horizontal Scroll (Item 9 Spec) */}
      {joinedCommunities.length > 0 && (
        <div className="space-y-1.5">
          <h3 className="text-xs font-bold text-[#493B40]">Your Joined Circles</h3>
          <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
            {joinedCommunities.map(comm => (
              <div 
                key={comm.id}
                onClick={() => onSelectCommunity(comm)}
                className="shrink-0 bg-white p-2.5 rounded-2xl border border-[#F0E1E6] flex items-center gap-2 cursor-pointer shadow-sm min-w-[170px]"
              >
                <img src={comm.cover} alt={comm.name} className="w-8 h-8 rounded-xl object-cover" />
                <div className="truncate">
                  <h4 className="text-xs font-semibold text-[#493B40] truncate">{comm.name}</h4>
                  <span className="text-[10px] text-[#8BAE91] font-medium">● Joined</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={18} className="absolute left-3.5 top-3 text-[#897A80]" />
        <input 
          type="text" 
          placeholder="Search support groups, topics..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-2xl border border-[#F0E1E6] text-xs focus:outline-none focus:ring-2 focus:ring-[#F4B8C8]"
        />
      </div>

      {/* Community Cards List */}
      <div className="space-y-3">
        {communities.map(comm => (
          <div 
            key={comm.id}
            onClick={() => onSelectCommunity(comm)}
            className="bg-white rounded-3xl p-4 border border-[#F0E1E6] shadow-sm hover:shadow-md transition cursor-pointer space-y-3"
          >
            <div className="flex gap-3">
              <img src={comm.cover} alt={comm.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
              <div className="flex-1 space-y-1">
                <span className="text-[10px] font-semibold text-[#C76F8A] bg-[#F9DCE4] px-2 py-0.5 rounded">
                  {comm.category}
                </span>
                <h3 className="font-bold text-[#493B40] text-sm leading-tight">{comm.name}</h3>
                <p className="text-xs text-[#897A80] line-clamp-2">{comm.description}</p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-[#F0E1E6]">
              <span className="text-xs text-[#897A80]">{comm.members} parents joined</span>

              <button 
                onClick={(e) => { e.stopPropagation(); onJoinToggle(comm.id); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  comm.joined 
                    ? 'bg-stone-100 text-[#897A80]' 
                    : 'bg-[#C76F8A] text-white shadow-sm'
                }`}
              >
                {comm.joined ? 'Joined ✓' : 'Join Circle'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CommunityDetailScreen({ community, onBack, onJoinToggle }) {
  return (
    <div className="p-4 space-y-4 bg-[#FFF9F5] min-h-full">
      <button onClick={onBack} className="flex items-center gap-1 text-xs text-[#C76F8A] font-semibold">
        <ChevronLeft size={18} /> Back to Communities
      </button>

      <div className="bg-white rounded-3xl overflow-hidden border border-[#F0E1E6] shadow-sm space-y-4 p-5">
        <div className="flex items-center gap-3">
          <img src={community.cover} alt={community.name} className="w-16 h-16 rounded-2xl object-cover" />
          <div>
            <span className="text-[10px] font-semibold text-[#C76F8A] bg-[#F9DCE4] px-2 py-0.5 rounded">
              {community.category}
            </span>
            <h2 className="text-base font-bold text-[#493B40] mt-1">{community.name}</h2>
            <p className="text-xs text-[#897A80]">{community.members} active members</p>
          </div>
        </div>

        <p className="text-xs text-[#493B40] leading-relaxed">{community.description}</p>

        <div className="bg-[#FFF9F5] p-3 rounded-2xl border border-[#F0E1E6] space-y-1">
          <h4 className="text-xs font-bold text-[#493B40]">Community Guidelines</h4>
          <ul className="text-xs text-[#897A80] list-disc list-inside space-y-1">
            {community.rules.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>

        <button 
          onClick={() => onJoinToggle(community.id)}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold transition shadow-sm ${
            community.joined ? 'bg-stone-200 text-[#493B40]' : 'bg-[#C76F8A] text-white'
          }`}
        >
          {community.joined ? 'Leave Community' : 'Join Community Circle'}
        </button>
      </div>
    </div>
  );
}

function NotificationsScreen({ notifications, setNotifications, onBack }) {
  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="p-4 space-y-4 bg-[#FFF9F5] min-h-full">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-[#C76F8A] font-semibold">
          <ChevronLeft size={18} /> Back
        </button>
        <button onClick={markAllRead} className="text-xs text-[#C76F8A] underline">
          Mark all as read
        </button>
      </div>

      <h2 className="text-lg font-bold text-[#493B40]">Notifications</h2>

      <div className="space-y-2">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`p-3.5 rounded-2xl border transition flex items-center gap-3 ${
              n.read ? 'bg-white border-[#F0E1E6]' : 'bg-[#F9DCE4]/40 border-[#F4B8C8]'
            }`}
          >
            <img src={n.avatar} alt={n.user} className="w-9 h-9 rounded-full object-cover shrink-0" />
            <div className="flex-1 text-xs">
              <p className="text-[#493B40]">
                <b>{n.user}</b> {n.message}
              </p>
              <span className="text-[10px] text-[#897A80]">{n.time}</span>
            </div>
            {!n.read && <span className="w-2 h-2 rounded-full bg-[#C76F8A]"></span>}
          </div>
        ))}
      </div>
    </div>
  );
}

function ParentProfileScreen({ 
  currentUser, posts, savedPosts, savedPlaces, savedEvents, 
  onBack, onEditProfile, onLogout, onSelectPlace, onSelectEvent, onLike, onSavePost, onAddComment 
}) {
  const [profileTab, setProfileTab] = useState('posts'); // 'posts' or 'saved'
  const [savedSubTab, setSavedSubTab] = useState('posts'); // 'posts', 'places', 'events'

  return (
    <div className="p-4 space-y-4 bg-[#FFF9F5] min-h-full">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="flex items-center gap-1 text-xs text-[#C76F8A] font-semibold">
          <ChevronLeft size={18} /> Back
        </button>
        <button onClick={onLogout} className="text-xs text-rose-600 flex items-center gap-1 font-semibold">
          <LogOut size={14} /> Logout
        </button>
      </div>

      {/* Profile Header */}
      <div className="bg-white rounded-3xl overflow-hidden border border-[#F0E1E6] shadow-sm">
        <div className="h-24 bg-cover bg-center" style={{ backgroundImage: `url(${currentUser.cover})` }}></div>
        <div className="px-5 pb-5 pt-0 relative">
          <div className="flex justify-between items-end -mt-8 mb-3">
            <img src={currentUser.avatar} alt={currentUser.name} className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-sm" />
            <button 
              onClick={onEditProfile}
              className="px-3 py-1.5 bg-[#FFF9F5] border border-[#F0E1E6] text-[#493B40] text-xs font-semibold rounded-xl hover:bg-[#F9DCE4]"
            >
              Edit Profile
            </button>
          </div>

          <h2 className="text-base font-bold text-[#493B40]">{currentUser.name}</h2>
          <p className="text-xs text-[#897A80] flex items-center gap-1 mt-0.5">
            <MapPin size={12} /> {currentUser.location}
          </p>

          <p className="text-xs text-[#493B40] mt-2 italic">
            "{currentUser.bio}"
          </p>
        </div>
      </div>

      {/* Profile Main Tabs */}
      <div className="flex bg-white p-1 rounded-2xl border border-[#F0E1E6]">
        <button 
          onClick={() => setProfileTab('posts')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
            profileTab === 'posts' ? 'bg-[#F4B8C8] text-[#493B40]' : 'text-[#897A80]'
          }`}
        >
          My Posts ({posts.length})
        </button>
        <button 
          onClick={() => setProfileTab('saved')}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl transition ${
            profileTab === 'saved' ? 'bg-[#F4B8C8] text-[#493B40]' : 'text-[#897A80]'
          }`}
        >
          Saved Items
        </button>
      </div>

      {/* Profile Tab Contents */}
      {profileTab === 'posts' ? (
        <div className="space-y-3">
          {posts.length === 0 ? (
            <p className="text-xs text-[#897A80] text-center py-6">You haven't published any posts yet.</p>
          ) : (
            posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                onLike={() => onLike(post.id)}
                onSave={() => onSavePost(post.id)}
                onAddComment={(text) => onAddComment(post.id, text)}
              />
            ))
          )}
        </div>
      ) : (
        /* Saved Items Sub-tabs */
        <div className="space-y-3">
          <div className="flex gap-2 text-xs">
            {['posts', 'places', 'events'].map(sub => (
              <button
                key={sub}
                onClick={() => setSavedSubTab(sub)}
                className={`px-3 py-1 rounded-lg capitalize transition ${
                  savedSubTab === sub ? 'bg-[#C76F8A] text-white font-semibold' : 'bg-white text-[#897A80] border border-[#F0E1E6]'
                }`}
              >
                Saved {sub}
              </button>
            ))}
          </div>

          {savedSubTab === 'posts' && (
            <div className="space-y-3">
              {savedPosts.length === 0 ? <p className="text-xs text-[#897A80] py-4 text-center">No saved posts.</p> : (
                savedPosts.map(p => <PostCard key={p.id} post={p} onLike={() => onLike(p.id)} onSave={() => onSavePost(p.id)} onAddComment={(t) => onAddComment(p.id, t)} />)
              )}
            </div>
          )}

          {savedSubTab === 'places' && (
            <div className="space-y-3">
              {savedPlaces.length === 0 ? <p className="text-xs text-[#897A80] py-4 text-center">No saved places.</p> : (
                savedPlaces.map(p => <PlaceCard key={p.id} place={p} onClick={() => onSelectPlace(p)} />)
              )}
            </div>
          )}

          {savedSubTab === 'events' && (
            <div className="space-y-3">
              {savedEvents.length === 0 ? <p className="text-xs text-[#897A80] py-4 text-center">No saved events.</p> : (
                savedEvents.map(e => (
                  <div key={e.id} onClick={() => onSelectEvent(e)} className="bg-white p-3 rounded-2xl border border-[#F0E1E6] text-xs cursor-pointer">
                    <h4 className="font-bold text-[#493B40]">{e.title}</h4>
                    <p className="text-[#897A80]">{e.date} • {e.venue}</p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function OrganizerView({ currentUser, events, setEvents, onLogout, onOpenAddEvent }) {
  const myEvents = events.filter(e => e.organizer === currentUser.name || e.organizerType.includes('NGO'));

  const handleDeleteEvent = (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(e => e.id !== eventId));
    }
  };

  return (
    <div className="flex-1 bg-[#FFF9F5] flex flex-col overflow-y-auto p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-3xl border border-[#F0E1E6] shadow-sm">
        <div>
          <span className="text-[10px] font-bold text-[#C76F8A] bg-[#F9DCE4] px-2 py-0.5 rounded">
            ORGANIZER PORTAL
          </span>
          <h2 className="text-base font-bold text-[#493B40] mt-1">Manage Events</h2>
          <p className="text-xs text-[#897A80]">{currentUser.name}</p>
        </div>
        <button onClick={onLogout} className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl">
          <LogOut size={18} />
        </button>
      </div>

      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold text-[#493B40]">Your Listed Events</h3>
        <button 
          onClick={onOpenAddEvent}
          className="px-3.5 py-2 bg-[#C76F8A] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-md hover:bg-[#b05c75]"
        >
          <Plus size={16} /> Add Event
        </button>
      </div>

      <div className="space-y-3">
        {myEvents.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-3xl border border-[#F0E1E6] p-6 text-[#897A80]">
            <Calendar size={32} className="mx-auto text-[#C76F8A] mb-2" />
            <p className="font-semibold text-sm">No events created yet</p>
            <p className="text-xs">Tap "Add Event" to publish a program for parents.</p>
          </div>
        ) : (
          myEvents.map(evt => (
            <div key={evt.id} className="bg-white p-4 rounded-3xl border border-[#F0E1E6] shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-[#493B40] text-sm">{evt.title}</h4>
                  <p className="text-xs text-[#897A80]">{evt.date} • {evt.venue}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                  evt.status === 'Published' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {evt.status || 'Published'}
                </span>
              </div>

              <div className="text-xs text-[#897A80] space-y-1 bg-[#FFF9F5] p-2.5 rounded-xl border border-[#F0E1E6]">
                <p><b>Fee:</b> {evt.fee === 'Free' ? 'Free' : evt.feeAmount}</p>
                <p><b>Registration Link:</b> {evt.registrationUrl || 'None (Contact basis)'}</p>
              </div>

              <div className="flex justify-end gap-2 pt-1">
                <button 
                  onClick={() => handleDeleteEvent(evt.id)}
                  className="px-3 py-1.5 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AddPostForm({ onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-4">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold text-[#493B40] text-base">Create Post</h3>
          <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Caption</label>
            <textarea 
              name="content"
              required
              rows={4}
              placeholder="Share a parenting win, ask for advice on schools, or discuss therapies..."
              className="w-full p-3 rounded-2xl border border-[#F0E1E6] text-xs focus:outline-none focus:ring-2 focus:ring-[#F4B8C8]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Image URL (Optional)</label>
            <input 
              type="url" 
              name="image"
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl border border-[#F0E1E6] text-xs"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-stone-100 text-[#897A80] rounded-xl text-xs font-semibold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-[#C76F8A] text-white rounded-xl text-xs font-semibold shadow-md">Post to Feed</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddPlaceForm({ onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold text-[#493B40] text-base">Add Accessible Place</h3>
          <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Place Name *</label>
            <input type="text" name="name" required placeholder="e.g. Taman Sensory Park" className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Category *</label>
            <select name="category" className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs">
              <option value="Sensory-Friendly Spaces">Sensory-Friendly Spaces</option>
              <option value="Therapy Centres">Therapy Centres</option>
              <option value="Learning Centres">Learning Centres</option>
              <option value="Parks and Playgrounds">Parks and Playgrounds</option>
              <option value="Family Entertainment">Family Entertainment</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Address *</label>
            <input type="text" name="address" required placeholder="Full street address..." className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Contact Number</label>
            <input type="text" name="contact" placeholder="+603-..." className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Accessibility Features</label>
            <div className="grid grid-cols-2 gap-1.5 text-xs">
              {['Wheelchair ramp', 'Sensory play zone', 'Accessible toilets', 'Quiet rest areas', 'Wide pathways', 'Therapy services'].map(feat => (
                <label key={feat} className="flex items-center gap-1.5 bg-[#FFF9F5] p-2 rounded-lg border border-[#F0E1E6]">
                  <input type="checkbox" name={feat} />
                  <span>{feat}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Description</label>
            <textarea name="description" rows={2} placeholder="Describe the place accessibility..." className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Parent Review / Tips</label>
            <textarea name="review" rows={2} placeholder="Your family's experience..." className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-stone-100 text-[#897A80] rounded-xl text-xs font-semibold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-[#C76F8A] text-white rounded-xl text-xs font-semibold shadow-md">Submit Place</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddEventForm({ onClose, onSubmit, isOrganizer }) {
  const [feeType, setFeeType] = useState('Free');

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md p-5 shadow-2xl space-y-3 max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold text-[#493B40] text-base">Add Event or Activity</h3>
          <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Event Name *</label>
            <input type="text" name="title" required placeholder="e.g. Inclusive Water Play Day" className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Venue / Location *</label>
            <input type="text" name="venue" required placeholder="e.g. Shah Alam Aquatic Centre" className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-[#493B40] mb-1">Date</label>
              <input type="date" name="date" required className="w-full p-2 rounded-xl border border-[#F0E1E6] text-xs" />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#493B40] mb-1">Time</label>
              <input type="text" name="time" placeholder="10:00 AM - 12:00 PM" className="w-full p-2 rounded-xl border border-[#F0E1E6] text-xs" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Registration Fee</label>
            <div className="flex gap-2 mb-2">
              <label className="flex items-center gap-1 text-xs">
                <input type="radio" name="feeType" value="Free" checked={feeType === 'Free'} onChange={() => setFeeType('Free')} /> Free
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input type="radio" name="feeType" value="Paid" checked={feeType === 'Paid'} onChange={() => setFeeType('Paid')} /> Paid
              </label>
            </div>
            {feeType === 'Paid' && (
              <input type="text" name="feeAmount" placeholder="e.g. RM 15" className="w-full p-2 rounded-xl border border-[#F0E1E6] text-xs" />
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">External Registration URL</label>
            <input type="url" name="registrationUrl" placeholder="https://forms.gle/..." className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Description</label>
            <textarea name="description" rows={3} placeholder="Event details and accessibility support..." className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-stone-100 text-[#897A80] rounded-xl text-xs font-semibold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-[#C76F8A] text-white rounded-xl text-xs font-semibold shadow-md">Submit Event</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddCommunityForm({ onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold text-[#493B40] text-base">Create Community Circle</h3>
          <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Circle Name *</label>
            <input type="text" name="name" required placeholder="e.g. ADHD Parents Shah Alam" className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Category</label>
            <input type="text" name="category" placeholder="e.g. Neurodiversity Support" className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Description</label>
            <textarea name="description" rows={3} placeholder="What is this community circle for?" className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#493B40] mb-1">Rules (One per line)</label>
            <textarea name="rules" rows={2} placeholder="Be kind and respectful&#10;No unverified claims" className="w-full p-2.5 rounded-xl border border-[#F0E1E6] text-xs" />
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-stone-100 text-[#897A80] rounded-xl text-xs font-semibold">Cancel</button>
            <button type="submit" className="flex-1 py-2.5 bg-[#C76F8A] text-white rounded-xl text-xs font-semibold shadow-md">Create Circle</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ChatbotModal({ messages, input, setInput, onSend, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end justify-center p-0 md:p-4">
      <div className="bg-white rounded-t-3xl md:rounded-3xl w-full max-w-md h-[80vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Chatbot Header */}
        <div className="bg-[#C76F8A] text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles size={20} />
            <div>
              <h3 className="font-bold text-sm">Mesra Assistant</h3>
              <p className="text-[10px] text-pink-100">Accessible places helper</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Quick Suggestions */}
        <div className="bg-[#FFF9F5] p-2 flex gap-1.5 overflow-x-auto border-b border-[#F0E1E6] text-[11px] no-scrollbar">
          {['Quiet place', 'Wheelchair accessible', 'Sensory play', 'Therapy centre'].map(sugg => (
            <button 
              key={sugg} 
              onClick={() => onSend(sugg)}
              className="bg-white text-[#C76F8A] border border-[#F4B8C8] px-2.5 py-1 rounded-full whitespace-nowrap hover:bg-[#F9DCE4]"
            >
              {sugg}
            </button>
          ))}
        </div>

        {/* Message Feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FFF9F5]">
          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-sm ${
                  m.sender === 'user' 
                    ? 'bg-[#C76F8A] text-white rounded-br-none' 
                    : 'bg-white text-[#493B40] rounded-bl-none border border-[#F0E1E6]'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-3 bg-white border-t border-[#F0E1E6] flex gap-2">
          <input 
            type="text" 
            placeholder="Ask about places (e.g. quiet room in KL)..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onSend()}
            className="flex-1 px-3.5 py-2 rounded-full border border-[#F0E1E6] text-xs focus:outline-none focus:ring-1 focus:ring-[#F4B8C8]"
          />
          <button 
            onClick={() => onSend()}
            className="p-2 bg-[#C76F8A] text-white rounded-full hover:bg-[#b05c75] transition"
          >
            <Send size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}

function EditProfileModal({ currentUser, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...currentUser });

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-3">
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold text-[#493B40] text-base">Edit Profile</h3>
          <button onClick={onClose} className="p-1 text-gray-400"><X size={20} /></button>
        </div>

        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-[#493B40] font-medium mb-1">Display Name</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#F0E1E6]"
            />
          </div>

          <div>
            <label className="block text-[#493B40] font-medium mb-1">General Location</label>
            <input 
              type="text" 
              value={formData.location} 
              onChange={e => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#F0E1E6]"
            />
          </div>

          <div>
            <label className="block text-[#493B40] font-medium mb-1">Biography</label>
            <textarea 
              rows={3} 
              value={formData.bio} 
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-2.5 rounded-xl border border-[#F0E1E6]"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button onClick={onClose} className="flex-1 py-2 bg-stone-100 text-[#897A80] rounded-xl font-semibold">Cancel</button>
            <button onClick={() => onSave(formData)} className="flex-1 py-2 bg-[#C76F8A] text-white rounded-xl font-semibold shadow-md">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportModal({ placeName, onClose, onSubmit }) {
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-sm p-5 shadow-2xl space-y-3 text-xs">
        <h3 className="font-bold text-[#493B40] text-sm">Report Inaccurate Info</h3>
        <p className="text-[#897A80]">Reporting updates for: <b>{placeName}</b></p>
        <textarea rows={3} placeholder="Please describe what is inaccurate or needs updating..." className="w-full p-2.5 rounded-xl border border-[#F0E1E6]" />
        <div className="flex gap-2">
          <button onClick={onClose} className="flex-1 py-2 bg-stone-100 text-[#897A80] rounded-xl font-semibold">Cancel</button>
          <button onClick={onSubmit} className="flex-1 py-2 bg-rose-600 text-white rounded-xl font-semibold">Submit Report</button>
        </div>
      </div>
    </div>
  );
}