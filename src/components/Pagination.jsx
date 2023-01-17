import React from 'react';
import { Typography } from '@mui/material';
import { When } from 'react-if';

export default function Pagination({ totalPages, onPrev, onNext, onChange }) {
  const [page, setPage] = React.useState(1);
  const decade = Math.floor(Math.abs(page - 1) / 10);
  function prevPage() {
    if (page > 1) {
      onPrev(page, page - 1);
      setPage(page - 1);
    }
  }
  function nextPage() {
    if (page < totalPages) {
      onNext(page, page + 1);
      setPage(page + 1);
    }
  }
  function gotoPage(p) {
    onChange(page, p + 1);
    setPage(p + 1);
  }
  return (
    <div
      style={{
        gap: '12px',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '9px',
        marginBottom: '9px',
      }}
    >
      <When condition={totalPages > 1}>
        <Typography onClick={prevPage} role="button">
          &lt;
        </Typography>
        {Array(10)
          .fill()
          .map((elem, index) => {
            const calculatedPageNo = (decade * 10) + (index + 1);
            return <When key={index} condition={calculatedPageNo <= totalPages}>
              <Typography
                role="button"
                style={{
                  fontWeight: calculatedPageNo === page ? 'bold' : 'medium',
                  textDecoration: calculatedPageNo === page ? 'underline' : 'unset',
                }}
                onClick={() => gotoPage((decade * 10) + index)}
              >
                {calculatedPageNo}
              </Typography>
            </When>
        })}
        <Typography role="button" onClick={nextPage}>
          &gt;
        </Typography>
      </When>
    </div>
  );
}
