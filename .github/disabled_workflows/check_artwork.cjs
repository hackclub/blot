const fs = require('fs');
const path = require('path');

function fileExists(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (err) {
        return false;
    }
}

function readMetadata(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        const metadataRegex = /@snapshot:\s*([^\s]+)/;
        const match = content.match(metadataRegex);
        return match ? match[1] : null;
    } catch (err) {
        return null;
    }
}

function countAndVerifySnapshots(artworkDir) {
    const indexPath = path.join(artworkDir, 'index.js');
    const snapshotsDirPath = path.join(artworkDir, 'snapshots');

    let comments = [];

    if (!fileExists(indexPath)) {
        comments.push(`::error file=${indexPath}::index.js is missing`);
        return comments.join('\n');
    }
    comments.push('✅ Step 1: There is index.js');

    const snapshotNameInMetadata = readMetadata(indexPath);
    if (!snapshotNameInMetadata) {
        comments.push(`::error file=${indexPath}::Snapshot name not found in metadata`);
        return comments.join('\n');
    }
    comments.push('✅ Step 2: Metadata found in index.js');

    const metadataBaseName = path.basename(snapshotNameInMetadata, path.extname(snapshotNameInMetadata));
    const expectedSnapshotBaseName = metadataBaseName.toLowerCase();
    comments.push(`✅ Step 3: Expected snapshot base name: ${expectedSnapshotBaseName}`);

    try {
        if (!fs.existsSync(snapshotsDirPath)) {
            throw new Error(`Snapshots directory does not exist: ${snapshotsDirPath}`);
        }

        const files = fs.readdirSync(snapshotsDirPath);
        const pngSnapshotFiles = files.filter(file => {
            const ext = path.extname(file).toLowerCase();
            return ext === '.png';
        }).sort();
        const snapshotsCount = pngSnapshotFiles.length;

        if (snapshotsCount < 3) {
            comments.push(`::error file=${snapshotsDirPath}::Expected at least 3 PNG snapshots, but only ${snapshotsCount} found`);
        } else {
            comments.push(`✅ Step 4: Found ${snapshotsCount} PNG snapshots`);
        }

        let mismatchedNames = false;
        pngSnapshotFiles.forEach((file, index) => {
            const expectedFileName = `${expectedSnapshotBaseName}${index + 1}.png`;
            if (file.toLowerCase() === expectedFileName.toLowerCase()) {
                comments.push(`✅ PNG Snapshot '${file}' matches the expected name '${expectedFileName}'`);
            } else {
                comments.push(`::error file=${snapshotsDirPath}/${file}::PNG Snapshot '${file}' should be named '${expectedFileName}'`);
                mismatchedNames = true;
            }
        });

    } catch (err) {
        comments.push(`::error file=${snapshotsDirPath}::Error reading PNG snapshots directory: ${err.message}`);
    }

    return comments.join('\n');
}

if (require.main === module) {
    if (process.argv.length !== 3) {
        console.error('Usage: node check_artwork.js <artwork_directory>');
        process.exit(1);
    }

    const artworkDir = process.argv[2];
    const result = countAndVerifySnapshots(artworkDir);
    console.log(result);
}

module.exports = countAndVerifySnapshots;