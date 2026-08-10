import React, { useState, useEffect } from 'react';
import { Heart, Gift, LogOut, Check, X, Clock, Plus, Trash2, Calendar, MapPin, Users, Loader } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

function AuthPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password
        });
        if (err) throw err;
        onLogin(data.user);
      } else {
        const { data, error: err } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (err) throw err;
        onLogin(data.user);
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-br from-rose-500 to-purple-500 p-3 rounded-xl mb-4">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Memento</h1>
          <p className="text-gray-600">Beautiful event invitations & memories</p>
        </div>

        <form onSubmit={handleAuth} className="bg-white rounded-2xl shadow-lg p-8 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">{error}</div>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>

          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="w-full text-center text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}

function CreateEventPage({ user, onEventCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    description: '',
    theme: 'minimal',
    dressCode: '',
    rsvpDeadline: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const slug = formData.name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.random().toString(36).substr(2, 9);
      
      const { data, error } = await supabase
        .from('events')
        .insert([{
          host_id: user.id,
          name: formData.name,
          date: formData.date,
          time: formData.time,
          location: formData.location,
          description: formData.description,
          theme: formData.theme,
          dress_code: formData.dressCode,
          rsvp_deadline: formData.rsvpDeadline,
          slug
        }])
        .select();

      if (error) throw error;
      onEventCreated(data[0]);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Create Event</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Cindy's 21st"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="The Beach House"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell guests what to expect..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Theme</label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'minimal', label: 'Minimal', color: 'from-gray-200 to-gray-300' },
                { value: 'party', label: 'Party', color: 'from-pink-200 to-purple-300' },
                { value: 'elegant', label: 'Elegant', color: 'from-amber-100 to-rose-100' }
              ].map(theme => (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() => setFormData({ ...formData, theme: theme.value })}
                  className={`p-4 rounded-lg font-semibold transition ${
                    formData.theme === theme.value
                      ? `bg-gradient-to-br ${theme.color} ring-2 ring-rose-500`
                      : `bg-gradient-to-br ${theme.color} opacity-60 hover:opacity-80`
                  }`}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Dress Code (optional)</label>
            <input
              type="text"
              name="dressCode"
              value={formData.dressCode}
              onChange={handleChange}
              placeholder="Cocktail attire"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">RSVP Deadline (optional)</label>
            <input
              type="date"
              name="rsvpDeadline"
              value={formData.rsvpDeadline}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
}

function InvitationPage({ event }) {
  const [rsvpStatus, setRsvpStatus] = useState(null);
  const [guestName, setGuestName] = useState('');
  const [plusOne, setPlusOne] = useState(0);
  const [dietaryRequirements, setDietaryRequirements] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventDate = new Date(event.date + 'T' + event.time);
  const dateStr = eventDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const timeStr = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const handleRSVPSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('rsvps')
        .insert([{
          event_id: event.id,
          guest_name: guestName,
          rsvp_status: rsvpStatus,
          plus_one: parseInt(plusOne),
          dietary_requirements: dietaryRequirements,
          message
        }]);

      if (error) throw error;
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="inline-block bg-green-100 p-3 rounded-full mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">RSVP Received!</h2>
            <p className="text-gray-600">Thanks for confirming, {guestName}. See you at the celebration!</p>
          </div>
        </div>
      </div>
    );
  }

  const themeClasses = {
    minimal: 'bg-gradient-to-br from-gray-50 to-gray-100',
    party: 'bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50',
    elegant: 'bg-gradient-to-br from-amber-50 to-rose-50'
  };

  return (
    <div className={`min-h-screen ${themeClasses[event.theme]} p-4`}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
          <div className={`h-32 bg-gradient-to-r ${
            event.theme === 'party' ? 'from-pink-400 to-purple-500' :
            event.theme === 'elegant' ? 'from-amber-300 to-rose-400' :
            'from-gray-400 to-gray-500'
          }`} />

          <div className="px-8 py-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{event.name}</h1>
            
            <div className="space-y-3 mb-8 text-gray-700">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-5 h-5" />
                <span className="text-lg">{dateStr} · {timeStr}</span>
              </div>
              
              {event.location && (
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="text-lg">{event.location}</span>
                </div>
              )}
            </div>

            {event.description && (
              <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">{event.description}</p>
            )}

            {event.dress_code && (
              <div className="bg-gray-50 p-4 rounded-lg mb-8">
                <p className="text-sm text-gray-600"><span className="font-semibold">Dress code:</span> {event.dress_code}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Will you be attending?</h2>

          <form onSubmit={handleRSVPSubmit} className="space-y-6">
            <div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: 'yes', label: '🎉 Yes', color: 'from-green-400 to-emerald-500' },
                  { value: 'maybe', label: '⏳ Maybe', color: 'from-yellow-400 to-orange-500' },
                  { value: 'no', label: '💔 No', color: 'from-red-400 to-pink-500' }
                ].map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRsvpStatus(option.value)}
                    className={`p-4 rounded-lg font-bold text-white transition transform ${
                      rsvpStatus === option.value
                        ? `bg-gradient-to-r ${option.color} ring-2 ring-offset-2 ring-gray-300 scale-105`
                        : `bg-gradient-to-r ${option.color} opacity-50 hover:opacity-75`
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
              <input
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                required
              />
            </div>

            {rsvpStatus === 'yes' && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Bringing a plus one?</label>
                <select
                  value={plusOne}
                  onChange={(e) => setPlusOne(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                >
                  <option value="0">No</option>
                  <option value="1">1 person</option>
                  <option value="2">2 people</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Dietary requirements</label>
              <input
                type="text"
                value={dietaryRequirements}
                onChange={(e) => setDietaryRequirements(e.target.value)}
                placeholder="e.g., Vegetarian, Gluten-free"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Message for the host</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Let them know you're excited!"
                rows="3"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <button
              type="submit"
              disabled={!guestName || !rsvpStatus || loading}
              className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit RSVP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function HostDashboard({ user, events, onLogout, onCreateEvent, onSelectEvent }) {
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (selectedEvent) {
    const event = events.find(e => e.id === selectedEvent);
    if (!event) return null;

    return (
      <EventDetail
        event={event}
        onBack={() => setSelectedEvent(null)}
        onLogout={onLogout}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">{user.email}</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 border border-gray-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <button
          onClick={onCreateEvent}
          className="mb-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
        >
          <Plus className="w-5 h-5" />
          Create New Event
        </button>

        {events.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="inline-block bg-rose-100 p-3 rounded-full mb-4">
              <Heart className="w-6 h-6 text-rose-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No events yet</h3>
            <p className="text-gray-600 mb-6">Create your first event to get started</p>
            <button
              onClick={onCreateEvent}
              className="px-6 py-2 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-600"
            >
              Create Event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event.id)}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1 text-left"
              >
                <div className={`h-24 bg-gradient-to-r ${
                  event.theme === 'party' ? 'from-pink-400 to-purple-500' :
                  event.theme === 'elegant' ? 'from-amber-300 to-rose-400' :
                  'from-gray-400 to-gray-500'
                }`} />
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EventDetail({ event, onBack, onLogout }) {
  const [rsvps, setRsvps] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [newWishItem, setNewWishItem] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showWishlist, setShowWishlist] = useState(false);

  useEffect(() => {
    loadData();
  }, [event.id]);

  const loadData = async () => {
    try {
      const { data: rsvpsData, error: rsvpError } = await supabase
        .from('rsvps')
        .select('*')
        .eq('event_id', event.id);

      const { data: wishlistData, error: wishError } = await supabase
        .from('wishlist_items')
        .select('*')
        .eq('event_id', event.id);

      if (rsvpError) throw rsvpError;
      if (wishError) throw wishError;

      setRsvps(rsvpsData || []);
      setWishlist(wishlistData || []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const invitationUrl = `${window.location.origin}?invitation=${event.slug}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addWishlistItem = async () => {
    if (!newWishItem.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('wishlist_items')
        .insert([{
          event_id: event.id,
          item_name: newWishItem,
          reserved_by: null
        }])
        .select();

      if (error) throw error;
      setWishlist([...wishlist, data[0]]);
      setNewWishItem('');
    } catch (err) {
      console.error(err);
    }
  };

  const deleteWishItem = async (itemId) => {
    try {
      const { error } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('id', itemId);

      if (error) throw error;
      setWishlist(wishlist.filter(w => w.id !== itemId));
    } catch (err) {
      console.error(err);
    }
  };

  const stats = {
    yes: rsvps.filter(r => r.rsvp_status === 'yes').length,
    no: rsvps.filter(r => r.rsvp_status === 'no').length,
    maybe: rsvps.filter(r => r.rsvp_status === 'maybe').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-rose-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="text-gray-600 hover:text-gray-900 font-semibold flex items-center gap-2"
          >
            ← Back
          </button>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-gray-700 hover:bg-gray-50 border border-gray-200"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-2">{event.name}</h1>
        <p className="text-gray-600 mb-8">Dashboard</p>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">Invitation Link</p>
              <p className="font-mono text-sm text-gray-900">{invitationUrl}</p>
            </div>
            <button
              onClick={copyToClipboard}
              className={`px-6 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                copied
                  ? 'bg-green-100 text-green-700'
                  : 'bg-rose-500 text-white hover:bg-rose-600'
              }`}
            >
              {copied ? '✓ Copied' : 'Copy Link'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Yes', count: stats.yes, icon: Check, color: 'from-green-400 to-emerald-500' },
            { label: 'Maybe', count: stats.maybe, icon: Clock, color: 'from-yellow-400 to-orange-500' },
            { label: 'No', count: stats.no, icon: X, color: 'from-red-400 to-pink-500' }
          ].map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-lg p-6">
              <div className={`inline-block bg-gradient-to-r ${stat.color} p-3 rounded-lg mb-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-600 text-sm mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900">{stat.count}</p>
            </div>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex gap-2 bg-white rounded-xl p-1 w-fit">
            <button
              onClick={() => setShowWishlist(false)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                !showWishlist
                  ? 'bg-rose-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              RSVPs
            </button>
            <button
              onClick={() => setShowWishlist(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2 ${
                showWishlist
                  ? 'bg-rose-500 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Gift className="w-4 h-4" />
              Wishlist
            </button>
          </div>
        </div>

        {!showWishlist ? (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {rsvps.length === 0 ? (
              <div className="p-12 text-center">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">No RSVPs yet. Share your invitation link!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">RSVP</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">+1</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Dietary</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Message</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rsvps.map(rsvp => (
                      <tr key={rsvp.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-900 font-semibold">{rsvp.guest_name}</td>
                        <td className="px-6 py-4">
                          {rsvp.rsvp_status === 'yes' && <span className="text-green-600 font-semibold">✓ Yes</span>}
                          {rsvp.rsvp_status === 'no' && <span className="text-red-600 font-semibold">✗ No</span>}
                          {rsvp.rsvp_status === 'maybe' && <span className="text-yellow-600 font-semibold">○ Maybe</span>}
                        </td>
                        <td className="px-6 py-4 text-gray-600">{rsvp.plus_one > 0 ? `+${rsvp.plus_one}` : '—'}</td>
                        <td className="px-6 py-4 text-gray-600">{rsvp.dietary_requirements || '—'}</td>
                        <td className="px-6 py-4 text-gray-600 italic">{rsvp.message || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newWishItem}
                  onChange={(e) => setNewWishItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addWishlistItem()}
                  placeholder="Add a gift idea..."
                  className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
                <button
                  onClick={addWishlistItem}
                  className="px-6 py-3 bg-rose-500 text-white rounded-lg font-semibold hover:bg-rose-600"
                >
                  Add
                </button>
              </div>
            </div>

            {wishlist.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Add gifts to your wishlist</p>
              </div>
            ) : (
              <div className="grid gap-3">
                {wishlist.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <Gift className="w-5 h-5 text-rose-500" />
                      <div>
                        <p className="font-semibold text-gray-900">{item.item_name}</p>
                        {item.reserved_by && (
                          <p className="text-sm text-gray-600">Reserved</p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <div className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        item.reserved_by
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {item.reserved_by ? 'Reserved' : 'Available'}
                      </div>
                      <button
                        onClick={() => deleteWishItem(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MementoApp() {
  const [currentUser, setCurrentUser] = useState(null);
  const [page, setPage] = useState('auth');
  const [invitationEvent, setInvitationEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        setCurrentUser(session.user);
        loadEvents(session.user.id);
        setPage('dashboard');
      } else {
        setPage('auth');
      }

      const params = new URLSearchParams(window.location.search);
      const slug = params.get('invitation');
      if (slug) {
        const { data: eventData } = await supabase
          .from('events')
          .select('*')
          .eq('slug', slug)
          .single();
        if (eventData) {
          setInvitationEvent(eventData);
          setPage('invitation');
        }
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const loadEvents = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('host_id', userId);

      if (error) throw error;
      setEvents(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    loadEvents(user.id);
    setPage('dashboard');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
    setPage('auth');
  };

  const handleEventCreated = (event) => {
    setEvents([...events, event]);
    setPage('dashboard');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <Loader className="w-8 h-8 text-rose-500 animate-spin" />
      </div>
    );
  }

  if (page === 'invitation' && invitationEvent) {
    return <InvitationPage event={invitationEvent} />;
  }

  if (!currentUser) {
    return <AuthPage onLogin={handleLogin} />;
  }

  if (page === 'create') {
    return <CreateEventPage user={currentUser} onEventCreated={handleEventCreated} />;
  }

  return (
    <HostDashboard
      user={currentUser}
      events={events}
      onLogout={handleLogout}
      onCreateEvent={() => setPage('create')}
      onSelectEvent={() => {}}
    />
  );
}
