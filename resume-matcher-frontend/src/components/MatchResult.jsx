function MatchResult({ result }) {
  if (!result) {
    return (
      <div className="text-center p-5">
        <p className="text-gray-500">Upload a resume or enter text to see match results</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Match Score</h3>
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                {result.fitPercentage || Math.round(result.matchingScore * 100)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
            <div 
              style={{ width: `${result.fitPercentage || (result.matchingScore * 100)}%` }} 
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
            ></div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Summary</h3>
        <p className="text-gray-700">{result.summary}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h3 className="font-semibold mb-2 text-green-600">Strengths</h3>
          <ul className="list-disc pl-5">
            {result.strengths && result.strengths.map((strength, index) => (
              <li key={index} className="text-gray-700">{strength}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2 text-red-600">Areas for Improvement</h3>
          <ul className="list-disc pl-5">
            {result.weaknesses && result.weaknesses.map((weakness, index) => (
              <li key={index} className="text-gray-700">{weakness}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Skills Identified</h3>
        <div className="flex flex-wrap gap-2">
          {result.extractedSkills && result.extractedSkills.map((skill, index) => (
            <span key={index} className="bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Relevant Keywords</h3>
        <div className="flex flex-wrap gap-2">
          {result.relevantKeywords && result.relevantKeywords.map((keyword, index) => (
            <span key={index} className="bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-700">
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchResult;
