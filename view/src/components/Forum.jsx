import React, { useState, useEffect } from 'react';
import axios from '../../axios';

axios.defaults.withCredentials = true;

const topics = ['stress', 'anxiety', 'depression', 'relationships'];

const Forum = () => {
    const [selectedTopic, setSelectedTopic] = useState(topics[0]);
    const [posts, setPosts] = useState([]);
    const [newPostContent, setNewPostContent] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                await axios.get('/api/users/current');
                setIsLoggedIn(true);
            } catch (error) {
                setIsLoggedIn(false);
            }
        };
        checkLogin();
    }, []);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/api/posts/${selectedTopic}`);
                console.log('API Response:', res.data);
                if (Array.isArray(res.data)) {
                    setPosts(res.data);
                } else {
                    console.error('Expected array from API, got:', res.data);
                    setPosts([]);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
                setPosts([]);
            }
        };
        fetchPosts();
    }, [selectedTopic]);

    const handleTopicChange = (e) => {
        setSelectedTopic(e.target.value);
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('You must be logged in to post');
            return;
        }
        try {
            await axios.post('/api/posts', { content: newPostContent, topic: selectedTopic });
            setNewPostContent('');
            const res = await axios.get(`/api/posts/${selectedTopic}`);
            if (Array.isArray(res.data)) {
                setPosts(res.data);
            } else {
                console.error('Expected array from API, got:', res.data);
                setPosts([]);
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                alert('You must be logged in to post');
            }
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`/api/posts/${postId}`);
            setPosts(posts.filter(post => post._id !== postId));
        } catch (error) {
            console.error(error);
        }
    };

    const handleLike = async (postId) => {
        try {
            await axios.post(`/api/posts/${postId}/like`);
            const res = await axios.get(`/api/posts/${selectedTopic}`);
            if (Array.isArray(res.data)) {
                setPosts(res.data);
            } else {
                console.error('Expected array from API, got:', res.data);
                setPosts([]);
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.status === 401) {
                alert('You must be logged in to like posts');
            }
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Community Forum</h2>
            <select
                value={selectedTopic}
                onChange={handleTopicChange}
                style={{
                    padding: '8px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    marginBottom: '16px'
                }}
            >
                {topics.map(topic => (
                    <option key={topic} value={topic}>
                        {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </option>
                ))}
            </select>
            <div style={{ marginBottom: '16px' }}>
                <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder="Share your thoughts..."
                    required
                    style={{
                        width: '100%',
                        padding: '8px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        minHeight: '80px'
                    }}
                />
                <button
                    onClick={handlePostSubmit}
                    disabled={!isLoggedIn}
                    style={{
                        marginTop: '8px',
                        padding: '8px 16px',
                        borderRadius: '4px',
                        backgroundColor: isLoggedIn ? '#3b82f6' : '#d1d5db',
                        color: '#fff',
                        cursor: isLoggedIn ? 'pointer' : 'not-allowed'
                    }}
                >
                    Post
                </button>
            </div>
            <div>
                {Array.isArray(posts) && posts.map(post => (
                    <div key={post._id} style={{
                        border: '1px solid #ddd',
                        padding: '16px',
                        marginBottom: '8px',
                        borderRadius: '8px'
                    }}>
                        <p>{post.content}</p>
                        <p style={{ fontSize: '14px', color: '#6b7280' }}>Likes: {post.likes}</p>
                        {isLoggedIn && (
                            <div style={{ marginTop: '8px' }}>
                                <button
                                    onClick={() => handleLike(post._id)}
                                    style={{
                                        padding: '6px 12px',
                                        backgroundColor: '#10b981',
                                        color: '#fff',
                                        borderRadius: '4px',
                                        marginRight: '8px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Like
                                </button>
                                {post.isAuthor && (
                                    <button
                                        onClick={() => handleDelete(post._id)}
                                        style={{
                                            padding: '6px 12px',
                                            backgroundColor: '#ef4444',
                                            color: '#fff',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        Delete
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                ))}
                {!Array.isArray(posts) && <p>Error loading posts. Please try again.</p>}
                {Array.isArray(posts) && posts.length === 0 && <p>No posts found for this topic.</p>}
            </div>
        </div>
    );
};

export default Forum;
