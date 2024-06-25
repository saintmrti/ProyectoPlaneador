import CircularProgress from '@mui/material/CircularProgress';

export const Spinner = () => (
    <div className='absolute inset-0 flex items-center justify-center z-10'>
        <div className='m-auto'>
            <CircularProgress size={80}/>
        </div>
    </div>
);