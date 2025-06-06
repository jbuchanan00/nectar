import { sequence } from '@sveltejs/kit/hooks';
import {withDb} from '$lib/hooks/index'

export const handle = sequence(withDb)