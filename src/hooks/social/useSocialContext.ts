```typescript
import { useState } from 'react';

type SocialSection = 'feed' | 'messages' | 'groups';

export const useSocialContext = () => {
  const [activeSection, setActiveSection] = useState<SocialSection>('feed');

  return {
    activeSection,
    setActiveSection
  };
};
```