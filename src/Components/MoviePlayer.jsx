import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    FaPlay,
    FaPause,
    FaVolumeUp,
    FaVolumeMute,
    FaExpand,
    FaCompress,
    FaArrowLeft,
    FaClosedCaptioning,
    FaCog,
} from 'react-icons/fa';
import { getMovieDetails } from '../utils/apiService';
import { useMovieContext } from '../context/MovieContext';

const MoviePlayer = () => {
    const { imdbID } = useParams();
    const navigate = useNavigate();
    const { addMovieToHistory } = useMovieContext();
    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const [movie, setMovie] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [quality, setQuality] = useState('auto');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const controlsTimeoutRef = useRef(null);

    // Fetch movie details
    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                setLoading(true);
                const data = await getMovieDetails(imdbID);
                setMovie(data);
                setError(null);
            } catch (err) {
                setError('Failed to load movie');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (imdbID) {
            fetchMovieDetails();
        }
    }, [imdbID]);

    // Handle video events
    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTime(videoRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            setDuration(videoRef.current.duration);
        }
    };

    const handleProgressChange = (e) => {
        const newTime = parseFloat(e.target.value);
        setCurrentTime(newTime);
        if (videoRef.current) {
            videoRef.current.currentTime = newTime;
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (videoRef.current) {
            videoRef.current.volume = newVolume;
        }
    };

    const handleMuteToggle = () => {
        if (videoRef.current) {
            if (isMuted) {
                videoRef.current.volume = volume;
                setIsMuted(false);
            } else {
                videoRef.current.volume = 0;
                setIsMuted(true);
            }
        }
    };

    const handleFullscreen = () => {
        if (playerRef.current) {
            if (!isFullscreen) {
                if (playerRef.current.requestFullscreen) {
                    playerRef.current.requestFullscreen();
                }
            } else {
                if (document.fullscreenElement) {
                    document.exitFullscreen();
                }
            }
            setIsFullscreen(!isFullscreen);
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }
        controlsTimeoutRef.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = Math.floor(seconds % 60);

        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    };

    const handleBack = () => {
        if (movie && currentTime > 0) {
            addMovieToHistory(movie, currentTime);
        }
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="bg-black w-full h-screen flex items-center justify-center">
                <div className="text-white text-2xl">Loading player...</div>
            </div>
        );
    }

    if (error || !movie) {
        return (
            <div className="bg-black w-full h-screen flex flex-col items-center justify-center gap-4">
                <div className="text-white text-2xl">{error || 'Unable to play movie'}</div>
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded hover:bg-gray-200 transition"
                >
                    <FaArrowLeft /> Go Back
                </button>
            </div>
        );
    }

    return (
        <div
            ref={playerRef}
            className="bg-black w-full h-screen flex flex-col"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => {
                if (controlsTimeoutRef.current) {
                    clearTimeout(controlsTimeoutRef.current);
                }
            }}
        >
            {/* Video Element */}
            <video
                ref={videoRef}
                className="w-full h-full object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-library/sample/Big_Buck_Bunny_1080p_surround.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Controls */}
            <div
                className={`absolute inset-0 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Top Controls */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-4 flex items-center gap-4">
                    <button
                        // onClick={handleBack}
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 bg-gray-800/60 hover:bg-gray-700 text-white px-4 py-2 rounded transition"
                    >
                        <FaArrowLeft /> Back
                    </button>
                    <div className="flex-1">
                        <h2 className="text-white text-xl font-semibold truncate">{movie.Title}</h2>
                    </div>
                </div>

                {/* Center Play/Pause */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
                    <button
                        onClick={handlePlayPause}
                        className="bg-white/30 hover:bg-white/50 text-white p-6 rounded-full transition transform hover:scale-110"
                    >
                        {isPlaying ? <FaPause size={40} /> : <FaPlay size={40} />}
                    </button>
                </div>

                {/* Bottom Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 space-y-3">
                    {/* Progress Bar */}
                    <input
                        type="range"
                        min="0"
                        max={duration || 0}
                        value={currentTime}
                        onChange={handleProgressChange}
                        className="w-full h-1 bg-gray-600 rounded cursor-pointer accent-red-600 hover:h-2 transition-all"
                    />

                    {/* Time Display */}
                    <div className="flex items-center justify-between">
                        <div className="text-white text-sm">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </div>
                        <div className="text-gray-400 text-xs">
                            {Math.round((currentTime / duration) * 100)}%
                        </div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            {/* Play/Pause */}
                            <button
                                onClick={handlePlayPause}
                                className="text-white hover:text-red-500 transition"
                                title={isPlaying ? 'Pause' : 'Play'}
                            >
                                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
                            </button>

                            {/* Volume */}
                            <div className="flex items-center gap-2 group">
                                <button
                                    onClick={handleMuteToggle}
                                    className="text-white hover:text-red-500 transition"
                                >
                                    {isMuted || volume === 0 ? (
                                        <FaVolumeMute size={20} />
                                    ) : (
                                        <FaVolumeUp size={20} />
                                    )}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={isMuted ? 0 : volume}
                                    onChange={handleVolumeChange}
                                    className="w-0 group-hover:w-24 transition-all h-1 bg-gray-600 rounded cursor-pointer accent-red-600"
                                />
                            </div>

                            {/* Settings */}
                            <select
                                value={quality}
                                onChange={(e) => setQuality(e.target.value)}
                                className="bg-gray-800 text-white text-sm px-2 py-1 rounded hover:bg-gray-700 transition"
                            >
                                <option value="auto">Auto</option>
                                <option value="1080p">1080p</option>
                                <option value="720p">720p</option>
                                <option value="480p">480p</option>
                            </select>

                            {/* Captions */}
                            <button
                                className="text-white hover:text-red-500 transition"
                                title="Subtitles"
                            >
                                <FaClosedCaptioning size={20} />
                            </button>
                        </div>

                        {/* Fullscreen */}
                        <button
                            onClick={handleFullscreen}
                            className="text-white hover:text-red-500 transition"
                            title="Fullscreen"
                        >
                            {isFullscreen ? (
                                <FaCompress size={20} />
                            ) : (
                                <FaExpand size={20} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Large Play Button for Initial State */}
            {!isPlaying && currentTime === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 pointer-events-auto">
                    <button
                        onClick={handlePlayPause}
                        className="bg-red-600 hover:bg-red-700 text-white p-8 rounded-full transition transform hover:scale-110"
                    >
                        <FaPlay size={60} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default MoviePlayer;
