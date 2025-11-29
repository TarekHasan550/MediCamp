import React from 'react'
import Logo from './navbar/Logo';

export default function Footer() {
  return (
    <div>
      <footer className="bg-muted-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4 *:text-foreground!"><Logo color='white' /></h3>
              <p className="text-muted">
                Providing quality healthcare services through organized medical
                camps.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">MediCamp</h3>
              <p className="text-muted">
                Providing quality healthcare services through organized medical
                camps.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">MediCamp</h3>
              <p className="text-muted">
                Providing quality healthcare services through organized medical
                camps.
              </p>
            </div>

            {/* Add more footer columns as needed */}
          </div>
        </div>
      </footer>
    </div>
  );
}
