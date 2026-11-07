'use client';
import {useEffect,useState} from 'react';import {PUBLIC_ORIGIN} from '../lib/publication';
export function useSiteOrigin(){const [origin,setOrigin]=useState(PUBLIC_ORIGIN);useEffect(()=>setOrigin(window.location.origin),[]);return origin}
