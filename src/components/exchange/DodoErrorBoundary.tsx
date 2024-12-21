import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class SFMErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('SFM Widget Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-red-600 dark:text-red-400 mb-2">
            <AlertCircle className="w-5 h-5" />
            <p className="font-medium">Unable to load SFM Exchange</p>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 mb-4">
            Please try again later or visit SFM Exchange directly.
          </p>
          <a
            href="https://app.sfmex.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Visit SFM Exchange
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}
